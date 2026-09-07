import '../../assets/styles/Group_purchase/GroupPurchaseGallery.css';
import groupPurchaseGalleryData from '../../data/Group_purchase/groupPurchaseGalleryData';
import useGroupPurchaseGallery from '../../hooks/Group_purchase/useGroupPurchaseGallery';

function GroupPurchaseGallery() {
  // Hook에서 선택된 이미지 번호와 선택 함수를 가져옵니다.
  const { selectedImageIndex, handleSelectImage } = useGroupPurchaseGallery();

  return (
    <div className="group_purchase_gallery">
      {/* 작은 상품 이미지 목록 */}
      <div className="group_purchase_thumbnails">
        {groupPurchaseGalleryData.map((image, index) => (
          <button
            type="button"
            className={`thumbnail_item ${selectedImageIndex === index ? 'active' : ''}`}
            onClick={() => handleSelectImage(index)}
            aria-label={`${index + 1}番目の商品画像を選択`}
            aria-pressed={selectedImageIndex === index}
            key={image.id}
          >
            {image.label}
          </button>
        ))}
      </div>

      {/* 선택된 큰 상품 이미지 */}
      <div className="group_purchase_main_image">
        商品画像 {selectedImageIndex + 1}
      </div>
    </div>
  );
}

export default GroupPurchaseGallery;
