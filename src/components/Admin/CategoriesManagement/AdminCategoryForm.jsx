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
          <h3>{editingId !== null ? "カテゴリ編集" : "カテゴリ登録"}</h3>
        </div>

        <button
          type="button"
          className="ac-form-close"
          onClick={onClose}
          disabled={isSaving}
          aria-label="フォームを閉じる"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <form className="ac-category-form" onSubmit={onSubmit}>
        <div className="ac-form-item">
          <label>
            カテゴリ名
            <b>*</b>
          </label>

          <input
            type="text"
            value={categoryName}
            maxLength={100}
            placeholder="カテゴリ名を入力してください。"
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
            キャンセル
          </button>

          <button type="submit" className="ac-save-button" disabled={isSaving}>
            {editingId !== null ? "変更を保存" : "登録"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AdminCategoryForm;
