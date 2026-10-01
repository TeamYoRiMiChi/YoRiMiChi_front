import { useEffect, useRef, useState } from "react";
import "../../../assets/styles/Admin/ProductManagement/AdminProduct_Image.css";

// 서버(AdminProductImageService)와 같은 기준입니다
export const MAX_PRODUCT_IMAGES = 10;
export const MAX_IMAGE_SIZE_MB = 10;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

/**
 * 고른 파일 중 올릴 수 있는 것만 걸러냅니다.
 * 걸러진 이유는 한 번에 모아서 메시지 하나로 돌려줍니다.
 *
 * @param {File[]} candidates 새로 고른 파일
 * @param {number} alreadyCount 이미 올라가 있거나 선택된 이미지 수
 * @returns {{ accepted: File[], message: string }}
 */
export const filterImageFiles = (candidates, alreadyCount = 0) => {
  const accepted = [];
  const problems = [];

  candidates.forEach((file) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      problems.push(`${file.name}: JPG・PNG・WEBP・GIF のみ登録できます。`);
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      problems.push(
        `${file.name}: ${MAX_IMAGE_SIZE_MB}MB 以下の画像を選択してください。`
      );
      return;
    }

    if (alreadyCount + accepted.length >= MAX_PRODUCT_IMAGES) {
      problems.push(`画像は最大${MAX_PRODUCT_IMAGES}枚まで登録できます。`);
      return;
    }

    accepted.push(file);
  });

  return {
    accepted,
    message: [...new Set(problems)].join("\n"),
  };
};

/**
 * 상품 등록 모달의 이미지 선택 영역
 *
 * 파일은 아직 서버에 올리지 않고 선택만 해 둡니다.
 * 상품이 등록된 직후에 부모(AdminProducts)가 한 번에 업로드합니다.
 * 맨 앞 이미지가 대표 이미지(목록·장바구니·주문에 보이는 이미지)가 됩니다.
 *
 * @param {File[]} files 선택된 파일들
 * @param {(files: File[]) => void} onChange 선택이 바뀔 때
 * @param {boolean} disabled 등록 중에는 막습니다
 */
const AdminProductImagePicker = ({
  files = [],
  onChange,
  disabled = false,
}) => {
  const inputRef = useRef(null);
  const [previewUrls, setPreviewUrls] = useState([]);

  // 미리보기 주소는 effect 안에서 만들고 정리합니다.
  // (렌더 중에 만들면 StrictMode에서 정리가 먼저 돌아 이미지가 깨집니다)
  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleSelect = (event) => {
    const picked = Array.from(event.target.files ?? []);

    // 같은 파일을 다시 골라도 change 이벤트가 오도록 값을 비웁니다
    event.target.value = "";

    if (picked.length === 0) {
      return;
    }

    const { accepted, message } = filterImageFiles(picked, files.length);

    if (message) {
      alert(message);
    }

    if (accepted.length > 0) {
      onChange([...files, ...accepted]);
    }
  };

  const handleRemove = (index) => {
    onChange(files.filter((_, fileIndex) => fileIndex !== index));
  };

  // 선택한 이미지를 맨 앞으로 보내 대표 이미지로 만듭니다
  const handleMakeFirst = (index) => {
    const next = [...files];
    const [picked] = next.splice(index, 1);
    onChange([picked, ...next]);
  };

  return (
    <div className="ap-modal-full ap-image-picker">
      <div className="ap-image-picker-head">
        <span className="ap-image-picker-title">
          商品画像
          <small>
            {files.length}/{MAX_PRODUCT_IMAGES}
          </small>
        </span>

        <button
          type="button"
          className="ap-image-add-button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || files.length >= MAX_PRODUCT_IMAGES}
        >
          画像を選択
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

      {files.length === 0 ? (
        <p className="ap-image-empty">
          選択した最初の画像が代表画像になります。（JPG・PNG・WEBP・GIF /
          1枚{MAX_IMAGE_SIZE_MB}MBまで）
        </p>
      ) : (
        <ul className="ap-image-grid">
          {files.map((file, index) => (
            <li
              className="ap-image-item"
              key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
            >
              {previewUrls[index] ? (
                <img src={previewUrls[index]} alt={file.name} />
              ) : (
                <span className="ap-image-loading" />
              )}

              {index === 0 && <span className="ap-image-badge">代表</span>}

              <div className="ap-image-item-actions">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleMakeFirst(index)}
                    disabled={disabled}
                  >
                    代表にする
                  </button>
                )}

                <button
                  type="button"
                  className="ap-image-danger"
                  onClick={() => handleRemove(index)}
                  disabled={disabled}
                >
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminProductImagePicker;
