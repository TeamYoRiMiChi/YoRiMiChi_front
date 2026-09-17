import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTag, faTrash } from "@fortawesome/free-solid-svg-icons";

function AdminCategoryTable({ categories, onEdit, onDelete }) {
  return (
    <div className="ac-table-scroll">
      <table className="ac-table">
        <thead>
          <tr>
            <th>카테고리 ID</th>
            <th>카테고리명</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.categoryId}>
              <td>
                <strong className="ac-id">{category.categoryId}</strong>
              </td>

              <td>
                <div className="ac-category-name">
                  <span className="ac-category-icon ac-child-icon">
                    <FontAwesomeIcon icon={faTag} />
                  </span>

                  <strong>{category.categoryName}</strong>
                </div>
              </td>

              <td>
                <div className="ac-actions">
                  <button
                    type="button"
                    className="ac-edit-button"
                    onClick={() => onEdit(category)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                    수정
                  </button>

                  <button
                    type="button"
                    className="ac-delete-button"
                    onClick={() => onDelete(category)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {categories.length === 0 && (
            <tr>
              <td colSpan={3} className="ac-empty">
                조건에 맞는 카테고리가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCategoryTable;
