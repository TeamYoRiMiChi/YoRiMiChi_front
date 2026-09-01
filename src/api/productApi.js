import axiosInstance from './axiosInstance';
import { USE_MOCK, ENDPOINTS, MOCK_DELAY } from '../config/api';
import { PRODUCTS, PER_PAGE } from '../data/Overseas/overseasData';

/**
 * Product 도메인 API
 *
 * 서버는 다음 형태로 응답합니다 (백엔드 ApiResponse + Spring Page):
 * {
 *   success: true,
 *   data: {
 *     content: [ ...상품 배열 ],
 *     totalElements: 145,
 *     totalPages: 19,
 *     number: 0,        // 현재 페이지 (0부터)
 *     size: 8
 *   }
 * }
 */

/* ============================================
   서버 응답 → 화면에서 쓰는 형태로 변환
   백엔드 컬럼명(snake/camel)이 바뀌면 여기만 고치면 됩니다.
============================================ */
export function toProductView(dto) {
  const priceJpy = dto.priceJpy ?? dto.price_jpy ?? 0;
  const originalJpy = dto.originalPriceJpy ?? dto.original_price_jpy ?? null;

  const discountRate =
    originalJpy && originalJpy > priceJpy
      ? Math.round((1 - priceJpy / originalJpy) * 100)
      : null;

  return {
    id: dto.productId ?? dto.product_id ?? dto.id,
    categoryId: dto.categoryId ?? dto.category_id,
    brand: dto.brand ?? '',
    name: dto.productName ?? dto.product_name ?? dto.name ?? '',
    nameJp: dto.productNameJp ?? dto.product_name_jp ?? '',
    priceNum: priceJpy,
    price: `¥${priceJpy.toLocaleString()}`,
    originalPrice: originalJpy ? `¥${originalJpy.toLocaleString()}` : null,
    discount: discountRate ? `${discountRate}%` : null,
    thumbnailUrl: dto.thumbnailUrl ?? dto.thumbnail_url ?? null,
    placeholder: dto.brand ?? dto.productName ?? '',
    stock: dto.stock ?? 0,
    status: dto.status ?? 'ACTIVE',
    sales: dto.sales ?? 0,
    createdAt: dto.createdAt ?? dto.created_at ?? null,
  };
}

/* ============================================
   목 데이터 (백엔드 준비 전용)
   서버와 똑같은 응답 형태를 흉내 냅니다.
============================================ */
function mockFetchProducts({ categoryId = 1, keyword = '', sort = 'recommend', page = 1, size = PER_PAGE }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const q = keyword.trim().toLowerCase();

      let list = PRODUCTS.filter((p) => {
        const matchCategory = categoryId === 1 || p.categoryId === categoryId;
        const matchKeyword =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q);
        return matchCategory && matchKeyword;
      });

      if (sort === 'popular') {
        list = [...list].sort((a, b) => b.sales - a.sales);
      } else if (sort === 'newest') {
        list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      const totalElements = list.length;
      const totalPages = Math.max(1, Math.ceil(totalElements / size));
      const content = list.slice((page - 1) * size, page * size);

      resolve({
        data: {
          success: true,
          data: { content, totalElements, totalPages, number: page - 1, size },
          message: null,
        },
      });
    }, MOCK_DELAY);
  });
}

/* ============================================
   API 함수
============================================ */

/**
 * 상품 목록 조회
 * @param {Object} params { categoryId, keyword, sort, page, size }
 */
export const getProducts = (params = {}) => {
  if (USE_MOCK) return mockFetchProducts(params);

  const { categoryId, keyword, sort, page = 1, size = PER_PAGE } = params;

  return axiosInstance.get(ENDPOINTS.PRODUCTS, {
    params: {
      // 전체(1)일 때는 categoryId를 안 보냄
      ...(categoryId && categoryId !== 1 ? { categoryId } : {}),
      ...(keyword?.trim() ? { keyword: keyword.trim() } : {}),
      sort,
      page: page - 1, // Spring Pageable은 0부터 시작
      size,
    },
  });
};

/** 상품 상세 조회 */
export const getProduct = (productId) => {
  return axiosInstance.get(`${ENDPOINTS.PRODUCTS}/${productId}`);
};

/** 카테고리 목록 조회 */
export const getCategories = () => {
  return axiosInstance.get(ENDPOINTS.CATEGORIES);
};
