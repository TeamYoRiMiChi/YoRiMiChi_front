import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, toProductView } from '../../api/productApi';

/**
 * 상품 목록 조회
 *
 * 서버가 필터·정렬·페이징까지 처리하므로 프론트는 받은 페이지만 그립니다.
 * 상품이 수천 개가 되어도 한 번에 8개씩만 받아옵니다.
 */
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (params, { rejectWithValue }) => {
    try {
      const res = await getProducts(params);
      const page = res.data.data; // ApiResponse의 data = PageResponse

      return {
        items: (page.content ?? []).map(toProductView),
        totalElements: page.totalElements ?? 0,
        totalPages: page.totalPages ?? 1,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ?? '商品の取得に失敗しました。'
      );
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    totalElements: 0,
    totalPages: 1,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearProducts: (state) => {
      state.items = [];
      state.totalElements = 0;
      state.totalPages = 1;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.items = [];
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
