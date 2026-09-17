import { useRef, useState } from "react";

import { createAdminCategory } from "../../../api/Admin/CategoriesManagement/adminCategoryApi";

function useAdminCategoryCreate({
  categoryName,
  refetchCategories,
  handleCloseForm,
}) {
  const [isCreating, setIsCreating] = useState(false);
  const creatingRef = useRef(false);

  const handleCreate = async () => {
    if (creatingRef.current) {
      return;
    }

    const name = categoryName.trim();

    if (!name) {
      alert("カテゴリー名を入力してください。");
      return;
    }

    creatingRef.current = true;
    setIsCreating(true);

    try {
      const response = await createAdminCategory(name);

      await refetchCategories();

      handleCloseForm();

      alert(response.data.message ?? "カテゴリーを登録しました。");
    } catch (err) {
      alert(err.response?.data?.message ?? "カテゴリーの登録に失敗しました。");
    } finally {
      creatingRef.current = false;
      setIsCreating(false);
    }
  };

  return {
    handleCreate,
    isCreating,
  };
}

export default useAdminCategoryCreate;
