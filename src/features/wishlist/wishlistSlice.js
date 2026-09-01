import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWishlist, addWishlist, removeWishlist } from '../../api/wishlistApi';

/** 내 찜 목록 불러오기 (로그인 후 1회) */
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getWishlist();
      // 서버가 상품 객체 배열을 주면 id만 뽑고, id 배열이면 그대로 사용
      const list = res.data.data ?? [];
      return list.map((it) => (typeof it === 'object' ? it.productId ?? it.id : it));
    } catch (err) {
      return rejectWithValue(err.response?.data?.message ?? 'お気に入りの取得に失敗しました。');
    }
  }
);

/**
 * 찜 토글
 *
 * 화면 반응을 빠르게 하려고 먼저 UI를 바꾸고(낙관적 업데이트),
 * 서버 요청이 실패하면 되돌립니다.
 */
export const toggleWishlist = createAsyncThunk(
  'wishlist/toggleWishlist',
  async (productId, { getState, dispatch, rejectWithValue }) => {
    const isWished = getState().wishlist.ids.includes(productId);

    dispatch(wishlistSlice.actions.optimisticToggle(productId));

    try {
      if (isWished) {
        await removeWishlist(productId);
      } else {
        await addWishlist(productId);
      }
      return { productId, wished: !isWished };
    } catch (err) {
      // 실패하면 원상복구
      dispatch(wishlistSlice.actions.optimisticToggle(productId));
      return rejectWithValue(err.response?.data?.message ?? 'お気に入りの更新に失敗しました。');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    ids: [], // 찜한 상품 id 배열
    status: 'idle',
    error: null,
  },
  reducers: {
    optimisticToggle: (state, action) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((v) => v !== id);
      } else {
        state.ids.push(id);
      }
    },
    clearWishlist: (state) => {
      state.ids = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ids = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { optimisticToggle, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
