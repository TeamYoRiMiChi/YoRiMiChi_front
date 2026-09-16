import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function AdminCategoryForm({
  isOpen,
  editingId,
  categoryName,
  isSaving,
  onNameChange,
  onSubmit,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <section className="ac-form-panel">
      <div className="ac-form-header">
        <div>
          <h3>{editingId !== null ? "카테고리 수정" : "카테고리 등록"}</h3>
        </div>

        <button
          type="button"
          className="ac-form-close"
          onClick={onClose}
          disabled={isSaving}
          aria-label="폼 닫기"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <form className="ac-category-form" onSubmit={onSubmit}>
        <div className="ac-form-item">
          <label>
            카테고리명
            <b>*</b>
          </label>

          <input
            type="text"
            value={categoryName}
            maxLength={100}
            placeholder="카테고리명을 입력해주세요."
            disabled={isSaving}
            onChange={(event) => onNameChange(event.target.value)}
          />
        </div>

        <div className="ac-form-actions">
          <button
            type="button"
            className="ac-cancel-button"
            onClick={onClose}
            disabled={isSaving}
          >
            취소
          </button>

          <button type="submit" className="ac-save-button" disabled={isSaving}>
            {editingId !== null ? "수정 저장" : "등록"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AdminCategoryForm;
