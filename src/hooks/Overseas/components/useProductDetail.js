import { useState, useEffect } from 'react';
import {
  getOverseasProduct,
  getOverseasProducts,
} from '../../../api/Overseas/overseasProductApi';
import { toProductView } from '../../../api/productApi';

/**
 * 해외직구 상품 상세 데이터 조회
 *
 * URL의 productId로 상품 하나를 불러오고,
 * 같은 카테고리의 다른 상품을 추천 목록으로 함께 받아옵니다.
 *
 * 흐름: 이 훅 → overseasProductApi → GET /api/overseas/products/{id}
 *       → OverseasProductController → OverseasProductService
 *       → ProductMapper → MySQL
 *
 * 서버가 saleType을 OVERSEAS로 고정하므로
 * 공동구매 전용 상품 id로 접근하면 404가 납니다.
 */
export function useProductDetail(productId) {
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 컴포넌트가 사라진 뒤 setState 하는 걸 막습니다
    let ignore = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await getOverseasProduct(productId);
        const view = toProductView(res.data.data);

        if (ignore) return;
        setProduct(view);

        // 추천 상품: 같은 카테고리에서 6개를 받아 자기 자신만 빼고 5개를 씁니다.
        // 해외직구 API라 공동구매 전용 상품은 애초에 섞이지 않습니다.
        const rel = await getOverseasProducts({
          categoryId: view.categoryId,
          size: 6,
        });

        if (ignore) return;
        setRelated(
          (rel.data.data.content ?? [])
            .map(toProductView)
            .filter((p) => p.id !== view.id)
            .slice(0, 5)
        );
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message ?? '商品の取得に失敗しました。');
          setProduct(null);
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();
    window.scrollTo({ top: 0 });

    return () => {
      ignore = true;
    };
  }, [productId]);

  return { product, related, isLoading, error };
}

export default useProductDetail;
