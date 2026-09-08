import { useState } from 'react';

// 상품 갤러리의 썸네일 선택 동작을 관리하는 Hook
function useGroupPurchaseGallery() {
  // 현재 선택된 이미지 번호를 기억합니다. 처음에는 첫 번째 이미지입니다.
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 썸네일을 클릭하면 선택된 이미지 번호를 변경합니다.
  const handleSelectImage = (imageIndex) => {
    setSelectedImageIndex(imageIndex);
  };

  return {
    selectedImageIndex,
    handleSelectImage,
  };
}

export default useGroupPurchaseGallery;
