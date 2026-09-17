import { useRef, useState } from "react";

import { deleteAdminCategory } from "../../../api/Admin/CategoriesManagement/adminCategoryApi";

function useAdminCategoryDelete({
  categories,
  page,
  editingId,
  isSaving,
  handleCloseForm,
  handlePageChange,
  refetchCategories,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deletingRef = useRef(false);

  const handleDelete = async (category) => {
    if (isSaving || deletingRef.current) {
      return;
    }

    const confirmed = window.confirm(
      `"${category.categoryName}" カテゴリーを削除しますか？`,
    );

    if (!confirmed) {
      return;
    }

    deletingRef.current = true;
    setIsDeleting(true);

    try {
      const response = await deleteAdminCategory(category.categoryId);

      if (editingId === category.categoryId) {
        handleCloseForm();
      }

      if (categories.length === 1 && page > 1) {
        handlePageChange(page - 1);
      } else {
        await refetchCategories();
      }

      alert(response.data.message ?? "カテゴリーを削除しました。");
    } catch (err) {
      alert(err.response?.data?.message ?? "カテゴリーの削除に失敗しました。");
    } finally {
      deletingRef.current = false;
      setIsDeleting(false);
    }
  };

  return {
    handleDelete,
    isDeleting,
  };
}

export default useAdminCategoryDelete;
