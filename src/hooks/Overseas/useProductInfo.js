import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetail } from './components/useProductDetail';
import { useProductGallery } from './components/useProductGallery';
import { useProductPurchase } from './components/useProductPurchase';

/**
 * 상품 상세 페이지 로직 (묶음)
 *
 * 역할별로 나눈 훅 세 개를 모아서 페이지에 넘겨줍니다.
 * 페이지는 이 훅 하나만 부르면 되고,
 * 각 기능을 고칠 때는 해당 훅만 열면 됩니다.
 *
 *   useProductDetail   : 서버에서 상품·추천 상품 조회
 *   useProductGallery  : 이미지 전환
 *   useProductPurchase : 수량·장바구니·찜
 */
export function useProductInfo() {
  const { productId } = useParams();

  const { product, related, isLoading, error } = useProductDetail(productId);
  const gallery = useProductGallery(product);
  const purchase = useProductPurchase(product);

  const [activeTab, setActiveTab] = useState('detail');

  /* 다른 상품으로 이동하면 첫 번째 탭으로 되돌립니다 */
  useEffect(() => {
    setActiveTab('detail');
  }, [productId]);

  /** 화면에 보여줄 상품 코드 (예: YM-000012) */
  const productCode = product
    ? `YM-${String(product.id).padStart(6, '0')}`
    : '';

  return {
    product,
    related,
    isLoading,
    error,
    productCode,

    gallery,
    purchase,

    activeTab,
    setActiveTab,
  };
}

export default useProductInfo;
