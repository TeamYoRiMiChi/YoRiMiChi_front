import { useEffect, useRef, useState } from "react";
import {
  changeAdminProductThumbnail,
  deleteAdminProductImage,
  getAdminProductImages,
  uploadAdminProductImages,
} from "../../../api/Admin/ProductManagement/adminProductApi";
import {
  MAX_IMAGE_SIZE_MB,
  MAX_PRODUCT_IMAGES,
  filterImageFiles,
} from "./AdminProduct_ImagePicker";
import "../../../assets/styles/Admin/ProductManagement/AdminProduct_RegisterModal.css";
import "../../../assets/styles/Admin/ProductManagement/AdminProduct_Image.css";

// 서버 응답({ data: { data: [...] } })에서 이미지 배열만 꺼냅니다
const pickImages = (response) => {
  const body = response?.data ?? response;
  const list = Array.isArray(body) ? body : body?.data;

  return Array.isArray(list) ? list : [];
};

/**
 * 기존 상품의 이미지 관리 모달
 *
 * 저장된 이미지를 보여주고, 추가·삭제·대표 이미지 변경을 바로 서버에 반영합니다.
 * 바뀔 때마다 부모에게 알려서 상품 목록의 대표 이미지도 같이 바뀌게 합니다.
 *
 * @param {object} product 관리할 상품 (productId, productName 필요)
 * @param {() => void} onClose 닫기
 * @param {(productId: number, images: object[]) => void} onChanged 이미지가 바뀐 뒤 호출
 */
const AdminProductImageModal = ({ product, onClose, onChanged }) => {
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const productId = product.productId;

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const response = await getAdminProductImages(productId);

        if (!ignore) {
          setImages(pickImages(response));
        }
      } catch (error) {
        console.error("상품 이미지 조회 실패:", error);

        if (!ignore) {
          setErrorMessage("画像を読み込めませんでした。");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [productId]);

  // 서버 요청 하나를 실행하고, 성공하면 받은 이미지 목록으로 화면과 부모를 갱신합니다
  const runRequest = async (request, failMessage) => {
    setIsBusy(true);
    setErrorMessage("");

    try {
      const response = await request();
      const nextImages = pickImages(response);

      setImages(nextImages);
      onChanged(productId, nextImages);
    } catch (error) {
      console.error("상품 이미지 처리 실패:", error);

      setErrorMessage(error?.response?.data?.message ?? failMessage);
    } finally {
      setIsBusy(false);
    }
  };

  const handleSelect = (event) => {
    const picked = Array.from(event.target.files ?? []);

    // 같은 파일을 다시 골라도 change 이벤트가 오도록 값을 비웁니다
    event.target.value = "";

    if (picked.length === 0) {
      return;
    }

    const { accepted, message } = filterImageFiles(picked, images.length);

    if (message) {
      alert(message);
    }

    if (accepted.length === 0) {
      return;
    }

    runRequest(
      () => uploadAdminProductImages(productId, accepted),
      "画像のアップロードに失敗しました。"
    );
  };

  const handleDelete = (image) => {
    if (!window.confirm("この画像を削除しますか？")) {
      return;
    }

    runRequest(
      () => deleteAdminProductImage(productId, image.imageId),
      "画像の削除に失敗しました。"
    );
  };

  const handleMakeThumbnail = (image) => {
    runRequest(
      () => changeAdminProductThumbnail(productId, image.imageId),
      "代表画像の変更に失敗しました。"
    );
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && !isBusy) {
      onClose();
    }
  };

  return (
    <div className="ap-modal-overlay" onMouseDown={handleOverlayClick}>
      <div
        className="ap-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-image-title"
      >
        <div className="ap-modal-header">
          <div>
            <h3 id="product-image-title">画像管理</h3>

            <p>{product.productName}</p>
          </div>

          <button
            type="button"
            className="ap-modal-close"
            onClick={onClose}
            aria-label="閉じる"
            disabled={isBusy}
          >
            ×
          </button>
        </div>

        <div className="ap-modal-form">
          <div className="ap-image-picker">
            <div className="ap-image-picker-head">
              <span className="ap-image-picker-title">
                登録済みの画像
                <small>
                  {images.length}/{MAX_PRODUCT_IMAGES}
                </small>
              </span>

              <button
                type="button"
                className="ap-image-add-button"
                onClick={() => inputRef.current?.click()}
                disabled={isBusy || images.length >= MAX_PRODUCT_IMAGES}
              >
                {isBusy ? "処理中..." : "画像を追加"}
              </button>

              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                style={{ display: "none" }}
                onChange={handleSelect}
              />
            </div>

            {errorMessage && (
              <p className="ap-image-error" role="alert">
                {errorMessage}
              </p>
            )}

            {isLoading ? (
              <p className="ap-image-empty">読み込み中...</p>
            ) : images.length === 0 ? (
              <p className="ap-image-empty">
                登録された画像がありません。「画像を追加」から登録してください。（JPG・PNG・WEBP・GIF
                / 1枚{MAX_IMAGE_SIZE_MB}MBまで）
              </p>
            ) : (
              <ul className="ap-image-grid">
                {images.map((image) => (
                  <li className="ap-image-item" key={image.imageId}>
                    <img src={image.imageUrl} alt={product.productName} />

                    {image.thumbnail && (
                      <span className="ap-image-badge">代表</span>
                    )}

                    <div className="ap-image-item-actions">
                      {!image.thumbnail && (
                        <button
                          type="button"
                          onClick={() => handleMakeThumbnail(image)}
                          disabled={isBusy}
                        >
                          代表にする
                        </button>
                      )}

                      <button
                        type="button"
                        className="ap-image-danger"
                        onClick={() => handleDelete(image)}
                        disabled={isBusy}
                      >
                        削除
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="ap-modal-actions">
            <button
              type="button"
              className="ap-modal-cancel"
              onClick={onClose}
              disabled={isBusy}
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductImageModal;
