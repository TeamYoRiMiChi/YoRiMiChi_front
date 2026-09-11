import '../../assets/styles/Group_purchase/GroupPurchaseGallery.css';
import groupPurchaseGalleryData from '../../data/Group_purchase/groupPurchaseGalleryData';
import useGroupPurchaseGallery from '../../hooks/Group_purchase/useGroupPurchaseGallery';

const STATUS_LABELS = {
  SUCCESS: '募集終了',
  FAILED: '目標未達',
  CANCELLED: '募集終了',
  CLOSING_SOON: '締切間近!',
};

function GroupPurchaseGallery({ productName, thumbnailUrl, status }) {
  // Hook에서 선택된 이미지 번호와 선택 함수 가지고옴
  const { selectedImageIndex, handleSelectImage } = useGroupPurchaseGallery();
  const images = thumbnailUrl
    ? [{ id: 'thumbnail', src: thumbnailUrl }]
    : groupPurchaseGalleryData;
  const selectedImage = images[selectedImageIndex] ?? images[0];
  const isClosed = ['SUCCESS', 'FAILED', 'CANCELLED'].includes(status);
  const statusLabel = STATUS_LABELS[status];

  return (
    <div className="group_purchase_gallery">
      {/* 작은 상품 이미지 목록 */}
      <div className="group_purchase_thumbnails">
        {images.map((image, index) => (
          <button
            type="button"
            className={`thumbnail_item ${selectedImageIndex === index ? 'active' : ''} ${isClosed ? 'is_closed' : ''}`}
            onClick={() => handleSelectImage(index)}
            aria-label={`${index + 1}番目の商品画像を選択`}
            aria-pressed={selectedImageIndex === index}
            key={image.id}
          >
            {image.src ? (
              <img src={image.src} alt={productName} />
            ) : (
              <span className="thumbnail_item_label">{productName}</span>
            )}
          </button>
        ))}
      </div>

      {/* 선택된 큰 상품 이미지 */}
      <div className={`group_purchase_main_image ${isClosed ? 'is_closed' : ''}`}>
        {selectedImage?.src ? (
          <img src={selectedImage.src} alt={productName} />
        ) : (
          <span className="group_purchase_main_image_label">{productName}</span>
        )}
        {statusLabel && (
          <span className={`group_purchase_image_status status_${status.toLowerCase()}`}>
            {statusLabel}
          </span>
        )}
      </div>
    </div>
  );
}

export default GroupPurchaseGallery;
