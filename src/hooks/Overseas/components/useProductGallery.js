import { useState, useEffect } from 'react';

/**
 * 상품 이미지 갤러리 로직
 *
 * 이미지 목록을 받아 현재 보고 있는 인덱스를 관리합니다.
 * PRODUCT_IMAGE 테이블 연동 전이라, 썸네일이 없으면
 * 자리표시자 4칸으로 대체합니다.
 *
 * @param {Object} product 상품 데이터 (없으면 null)
 */
export function useProductGallery(product) {
  const [index, setIndex] = useState(0);

  const images = product?.thumbnailUrl
    ? [product.thumbnailUrl]
    : [null, null, null, null];

  /* 다른 상품으로 이동하면 첫 번째 이미지로 되돌립니다 */
  useEffect(() => {
    setIndex(0);
  }, [product?.id]);

  /** dir: -1 = 이전, 1 = 다음. 끝에 닿으면 반대편으로 순환 */
  const move = (dir) => {
    setIndex((cur) => (cur + dir + images.length) % images.length);
  };

  return {
    images,
    index,
    setIndex,
    move,
    current: images[index],
    total: images.length,
  };
}

export default useProductGallery;
