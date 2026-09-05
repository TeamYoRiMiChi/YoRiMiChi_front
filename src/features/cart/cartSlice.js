import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as cartApi from '../../api/cartApi';
import { toCartItemView } from '../../api/cartApi';

/**
 * 서버 응답(장바구니 전체)을 화면용으로 변환
 *
 * 모든 API가 같은 형태를 돌려주므로 한 곳에서 처리합니다.
 */
function toCartState(data) {
  return {
    items: (data.items ?? []).map(toCartItemView),
    totalCount: data.totalCount ?? 0,
    totalQuantity: data.totalQuantity ?? 0,
    totalPriceNum: Number(data.totalPrice ?? 0),
  };
}

function errorMessage(err, fallback) {
  return err.response?.data?.message ?? fallback;
}

/* ===== 조회 ===== */
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await cartApi.getCart();
      return toCartState(res.data.data);
    } catch (err) {
      return rejectWithValue(errorMessage(err, 'カートの取得に失敗しました。'));
    }
  }
);

/* ===== 담기 ===== */
export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await cartApi.addCartItem(productId, quantity);
      return toCartState(res.data.data);
    } catch (err) {
      return rejectWithValue(errorMessage(err, 'カートへの追加に失敗しました。'));
    }
  }
);

/* ===== 수량 변경 ===== */
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const res = await cartApi.updateCartItem(cartItemId, quantity);
      return toCartState(res.data.data);
    } catch (err) {
      return rejectWithValue(errorMessage(err, '数量の変更に失敗しました。'));
    }
  }
);

/* ===== 삭제 ===== */
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (cartItemId, { rejectWithValue }) => {
    try {
      const res = await cartApi.removeCartItem(cartItemId);
      return toCartState(res.data.data);
    } catch (err) {
      return rejectWithValue(errorMessage(err, '削除に失敗しました。'));
    }
  }
);

/* ===== 전체 비우기 ===== */
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await cartApi.clearCart();
      return toCartState(res.data.data);
    } catch (err) {
      return rejectWithValue(errorMessage(err, 'カートを空にできませんでした。'));
    }
  }
);

const initialState = {
  items: [],
  totalCount: 0,
  totalQuantity: 0,
  totalPriceNum: 0,

  status: 'idle',    // 목록 조회 상태
  addStatus: 'idle', // 담기 상태 (버튼 비활성화용)
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /** 로그아웃 시 화면에 남지 않도록 비웁니다 */
    resetCart: () => initialState,
  },
  extraReducers: (builder) => {
    /* 모든 성공 응답이 같은 형태라 공통으로 처리합니다 */
    const applyCart = (state, action) => {
      state.items = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPriceNum = action.payload.totalPriceNum;
      state.error = null;
    };

    builder
      /* 조회 */
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        applyCart(state, action);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      /* 담기 */
      .addCase(addCartItem.pending, (state) => {
        state.addStatus = 'loading';
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.addStatus = 'succeeded';
        applyCart(state, action);
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.addStatus = 'failed';
        state.error = action.payload;
      })

      /* 수량 변경 · 삭제 · 비우기 */
      .addCase(updateCartItem.fulfilled, applyCart)
      .addCase(removeCartItem.fulfilled, applyCart)
      .addCase(clearCart.fulfilled, applyCart)

      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
