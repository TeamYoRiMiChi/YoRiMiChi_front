import { useRef, useState } from "react";

import { updateAdminCategory } from "../../../api/Admin/CategoriesManagement/adminCategoryApi";

function useAdminCategoryUpdate({
  editingId,
  categoryName,
  refetchCategories,
  handleCloseForm,
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const updatingRef = useRef(false);

  const handleUpdate = async () => {
    if (updatingRef.current) {
      return;
    }

    const name = categoryName.trim();

    if (!name) {
      alert("カテゴリー名を入力してください。");
      return;
    }

    updatingRef.current = true;
    setIsUpdating(true);

    try {
      const response = await updateAdminCategory(editingId, name);

      await refetchCategories();

      handleCloseForm();

      alert(response.data.message ?? "カテゴリーを更新しました。");
    } catch (err) {
      alert(err.response?.data?.message ?? "カテゴリーの更新に失敗しました。");
    } finally {
      updatingRef.current = false;
      setIsUpdating(false);
    }
  };

  return {
    handleUpdate,
    isUpdating,
  };
}

export default useAdminCategoryUpdate;
