import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import '../../../assets/styles/Overseas/ProductInfo/ProductGallery.css';

/**
 * 상품 이미지 갤러리
 *
 * 왼쪽 썸네일 목록 + 가운데 큰 이미지로 구성됩니다.
 *
 * @param {Object} gallery   useProductGallery의 반환값
 * @param {string} altText   이미지 대체 텍스트
 * @param {string} fallback  이미지가 없을 때 보여줄 문구 (브랜드명 등)
 */
function ProductGallery({ gallery, altText, fallback }) {
  const { images, index, setIndex, move, current, total } = gallery;

  return (
    <>
      {/* 썸네일 목록 */}
      <div className="pinfo-thumbs">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            className={`pinfo-thumb ${index === i ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`画像${i + 1}を表示`}
          >
            {img ? <img src={img} alt="" /> : <span>{fallback}</span>}
          </button>
        ))}

        <button type="button" className="pinfo-thumb-more" aria-label="もっと見る">
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>

      {/* 큰 이미지 */}
      <div className="pinfo-gallery">
        {current ? (
          <img src={current} alt={altText} />
        ) : (
          <div className="pinfo-noimage">{fallback}</div>
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              className="pinfo-gallery-arrow prev"
              onClick={() => move(-1)}
              aria-label="前の画像"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <button
              type="button"
              className="pinfo-gallery-arrow next"
              onClick={() => move(1)}
              aria-label="次の画像"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}

        <span className="pinfo-gallery-count">
          {index + 1} / {total}
        </span>
      </div>
    </>
  );
}

export default ProductGallery;
