import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faMagnifyingGlass,
  faPlus,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

import AdminStatusBox from "../../../components/Admin/common/Admin_statusBox";
import AdminPagination from "../../../components/Admin/common/AdminPagination";
import AdminCategoryForm from "../../../components/Admin/CategoriesManagement/AdminCategoryForm";
import AdminCategoryTable from "../../../components/Admin/CategoriesManagement/AdminCategoryTable";

import useAdminCategories from "../../../hooks/Admin/CategoriesManagement/useAdminCategories";
import useAdminCategoryCreate from "../../../hooks/Admin/CategoriesManagement/useAdminCategoryCreate";
import useAdminCategoryUpdate from "../../../hooks/Admin/CategoriesManagement/useAdminCategoryUpdate";
import useAdminCategoryDelete from "../../../hooks/Admin/CategoriesManagement/useAdminCategoryDelete";

import "../../../assets/styles/Admin/CategoriesManagement/AdminCategories.css";
import "../../../assets/styles/Admin/CategoriesManagement/AdminCategoryForm.css";
import "../../../assets/styles/Admin/CategoriesManagement/AdminCategoryTable.css";

function AdminCategories() {
  const {
    categories,
    keyword,
    page,
    totalCount,
    totalPages,
    handleKeywordChange,
    handlePageChange,
    handleReset,
    refetchCategories,
  } = useAdminCategories();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setCategoryName("");
  };

  const { handleCreate, isCreating } = useAdminCategoryCreate({
    categoryName,
    refetchCategories,
    handleCloseForm,
  });

  const { handleUpdate, isUpdating } = useAdminCategoryUpdate({
    editingId,
    categoryName,
    refetchCategories,
    handleCloseForm,
  });

  const isSaving = isCreating || isUpdating;

  const { handleDelete, isDeleting } = useAdminCategoryDelete({
    categories,
    page,
    editingId,
    isSaving,
    handleCloseForm,
    handlePageChange,
    refetchCategories,
  });

  const isBusy = isSaving || isDeleting;

  const summaryItems = [
    {
      key: "total",
      label: "全カテゴリ",
      value: totalCount,
      icon: faList,
      color: "blue",
    },
  ];

  const handleOpenCreate = () => {
    if (isBusy) {
      return;
    }

    setEditingId(null);
    setCategoryName("");
    setIsFormOpen(true);
  };

  const handleEdit = (category) => {
    if (isBusy) {
      return;
    }

    setEditingId(category.categoryId);
    setCategoryName(category.categoryName);
    setIsFormOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isBusy) {
      return;
    }

    if (editingId !== null) {
      return handleUpdate();
    }

    return handleCreate();
  };

  return (
    <div className="ac-page">
      <header className="ac-page-header">
        <div>
          <h2>カテゴリ管理</h2>
          <p>商品カテゴリを管理します。</p>
        </div>

        <button
          type="button"
          className="ac-create-button"
          onClick={handleOpenCreate}
          disabled={isBusy}
        >
          <FontAwesomeIcon icon={faPlus} />
          カテゴリ登録
        </button>
      </header>

      <AdminStatusBox items={summaryItems} />

      <AdminCategoryForm
        isOpen={isFormOpen}
        editingId={editingId}
        categoryName={categoryName}
        isSaving={isBusy}
        onNameChange={setCategoryName}
        onSubmit={handleSubmit}
        onClose={handleCloseForm}
      />

      <section className="ac-panel">
        <div className="ac-filter-bar">
          <label className="ac-search-box">
            <FontAwesomeIcon icon={faMagnifyingGlass} />

            <input
              type="search"
              value={keyword}
              placeholder="カテゴリ名またはIDで検索"
              onChange={handleKeywordChange}
              disabled={isBusy}
            />
          </label>

          <button
            type="button"
            className="ac-reset-button"
            onClick={handleReset}
            disabled={isBusy}
          >
            <FontAwesomeIcon icon={faRotateRight} />
            リセット
          </button>
        </div>

        <AdminCategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <AdminPagination
          totalCount={totalCount}
          totalLabel="件のカテゴリ"
          page={page}
          totalPages={totalPages}
          onPageChange={(nextPage) => {
            if (!isBusy) {
              handlePageChange(nextPage);
            }
          }}
        />
      </section>
    </div>
  );
}

export default AdminCategories;
