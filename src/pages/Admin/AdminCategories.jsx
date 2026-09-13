import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFolder,
  faList,
  faMagnifyingGlass,
  faPen,
  faPlus,
  faRotateRight,
  faTag,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import AdminStatusBox from "../../components/Admin/Admin_statusBox";

import "./AdminCategories.css";


/* =========================
   임시 카테고리 데이터
========================= */

const initialCategories = [
  {
    categoryId: 1,
    categoryName: "식품",
    parentCategoryId: null,
  },

  {
    categoryId: 2,
    categoryName: "패션",
    parentCategoryId: null,
  },

  {
    categoryId: 3,
    categoryName: "뷰티",
    parentCategoryId: null,
  },

  {
    categoryId: 4,
    categoryName: "과자 · 디저트",
    parentCategoryId: 1,
  },

  {
    categoryId: 5,
    categoryName: "면 · 라면",
    parentCategoryId: 1,
  },

  {
    categoryId: 6,
    categoryName: "상의",
    parentCategoryId: 2,
  },

  {
    categoryId: 7,
    categoryName: "하의",
    parentCategoryId: 2,
  },

  {
    categoryId: 8,
    categoryName: "스킨케어",
    parentCategoryId: 3,
  },
];


function AdminCategories() {

  const [categories, setCategories] =
    useState(initialCategories);


  /* =========================
     검색 / 필터
  ========================= */

  const [keyword, setKeyword] = useState("");

  const [categoryType, setCategoryType] =
    useState("");

  const [parentFilter, setParentFilter] =
    useState("");


  /* =========================
     등록 / 수정 폼
  ========================= */

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [categoryName, setCategoryName] =
    useState("");

  const [parentCategoryId, setParentCategoryId] =
    useState("");


  /* =========================
     상위 카테고리
  ========================= */

  const parentCategories = useMemo(() => {

    return categories.filter(
      (category) =>
        category.parentCategoryId === null
    );

  }, [categories]);


  /* =========================
     현황
  ========================= */

  const summary = useMemo(() => {

    return {

      total: categories.length,

      parent: categories.filter(
        (category) =>
          category.parentCategoryId === null
      ).length,

      child: categories.filter(
        (category) =>
          category.parentCategoryId !== null
      ).length,
    };

  }, [categories]);


  const summaryItems = [

    {
      key: "total",
      label: "전체 카테고리",
      value: summary.total,
      icon: faList,
      color: "blue",
    },

    {
      key: "parent",
      label: "상위 카테고리",
      value: summary.parent,
      icon: faFolder,
      color: "green",
    },

    {
      key: "child",
      label: "하위 카테고리",
      value: summary.child,
      icon: faTag,
      color: "orange",
    },
  ];


  /* =========================
     부모 카테고리 이름
  ========================= */

  const getParentName = (parentId) => {

    if (parentId === null) {
      return "-";
    }

    const parent = categories.find(
      (category) =>
        category.categoryId === parentId
    );

    return parent
      ? parent.categoryName
      : "-";
  };


  /* =========================
     하위 카테고리 개수
  ========================= */

  const getChildCount = (categoryId) => {

    return categories.filter(
      (category) =>
        category.parentCategoryId === categoryId
    ).length;
  };


  /* =========================
     필터링
  ========================= */

  const filteredCategories = useMemo(() => {

    const normalizedKeyword =
      keyword.trim().toLowerCase();


    return categories.filter((category) => {

      const keywordMatches =
        !normalizedKeyword ||
        category.categoryName
          .toLowerCase()
          .includes(normalizedKeyword) ||
        String(category.categoryId)
          .includes(normalizedKeyword);


      const typeMatches =
        !categoryType ||

        (
          categoryType === "PARENT" &&
          category.parentCategoryId === null
        ) ||

        (
          categoryType === "CHILD" &&
          category.parentCategoryId !== null
        );


      const parentMatches =
        !parentFilter ||

        category.parentCategoryId ===
          Number(parentFilter);


      return (
        keywordMatches &&
        typeMatches &&
        parentMatches
      );
    });

  }, [
    categories,
    keyword,
    categoryType,
    parentFilter,
  ]);


  /* =========================
     초기화
  ========================= */

  const handleReset = () => {

    setKeyword("");

    setCategoryType("");

    setParentFilter("");
  };


  /* =========================
     등록 버튼
  ========================= */

  const handleOpenCreate = () => {

    setEditingId(null);

    setCategoryName("");

    setParentCategoryId("");

    setIsFormOpen(true);
  };


  /* =========================
     수정
  ========================= */

  const handleEdit = (category) => {

    setEditingId(category.categoryId);

    setCategoryName(
      category.categoryName
    );

    setParentCategoryId(
      category.parentCategoryId === null
        ? ""
        : String(
            category.parentCategoryId
          )
    );

    setIsFormOpen(true);
  };


  /* =========================
     폼 닫기
  ========================= */

  const handleCloseForm = () => {

    setIsFormOpen(false);

    setEditingId(null);

    setCategoryName("");

    setParentCategoryId("");
  };


  /* =========================
     등록 / 수정 저장
  ========================= */

  const handleSubmit = (event) => {

    event.preventDefault();


    if (!categoryName.trim()) {

      alert("카테고리명을 입력해주세요.");

      return;
    }


    const selectedParentId =
      parentCategoryId === ""
        ? null
        : Number(parentCategoryId);


    /* 수정 */

    if (editingId !== null) {

      setCategories((current) =>
        current.map((category) => {

          if (
            category.categoryId !==
            editingId
          ) {
            return category;
          }

          return {

            ...category,

            categoryName:
              categoryName.trim(),

            parentCategoryId:
              selectedParentId,
          };
        })
      );


      handleCloseForm();

      return;
    }


    /* 등록 */

    const nextId =
      categories.length === 0
        ? 1
        : Math.max(
            ...categories.map(
              (category) =>
                category.categoryId
            )
          ) + 1;


    const newCategory = {

      categoryId: nextId,

      categoryName:
        categoryName.trim(),

      parentCategoryId:
        selectedParentId,
    };


    setCategories((current) => [
      ...current,
      newCategory,
    ]);


    handleCloseForm();
  };


  /* =========================
     삭제
  ========================= */

  const handleDelete = (category) => {

    const childCount =
      getChildCount(
        category.categoryId
      );


    /*
      부모 카테고리에
      자식 카테고리가 있으면 삭제 금지

      parent_category_id FK 관계 때문
    */

    if (childCount > 0) {

      alert(
        "하위 카테고리가 존재합니다.\n하위 카테고리를 먼저 삭제해주세요."
      );

      return;
    }


    const confirmed =
      window.confirm(
        `"${category.categoryName}" 카테고리를 삭제하시겠습니까?`
      );


    if (!confirmed) {
      return;
    }


    setCategories((current) =>
      current.filter(
        (item) =>
          item.categoryId !==
          category.categoryId
      )
    );
  };


  return (

    <div className="ac-page">


      {/* =========================
          페이지 헤더
      ========================= */}

      <header className="ac-page-header">

        <div>

          <h2>카테고리 관리</h2>

          <p>
            상품 카테고리와
            상위·하위 카테고리를 관리하세요.
          </p>

        </div>


        <button
          type="button"
          className="ac-create-button"
          onClick={handleOpenCreate}
        >

          <FontAwesomeIcon
            icon={faPlus}
          />

          카테고리 등록

        </button>

      </header>



      {/* =========================
          현황 카드
      ========================= */}

      <AdminStatusBox
        items={summaryItems}
      />



      {/* =========================
          등록 / 수정 폼
      ========================= */}

      {isFormOpen && (

        <section className="ac-form-panel">


          <div className="ac-form-header">

            <div>

              <h3>
                {editingId !== null
                  ? "카테고리 수정"
                  : "카테고리 등록"}
              </h3>

              <p>
                상위 카테고리를 선택하면
                하위 카테고리로 등록됩니다.
              </p>

            </div>


            <button
              type="button"
              className="ac-form-close"
              onClick={
                handleCloseForm
              }
            >

              <FontAwesomeIcon
                icon={faXmark}
              />

            </button>

          </div>


          <form
            className="ac-category-form"
            onSubmit={handleSubmit}
          >


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
                onChange={(event) =>
                  setCategoryName(
                    event.target.value
                  )
                }
              />

            </div>



            <div className="ac-form-item">

              <label>
                상위 카테고리
              </label>

              <select
                value={parentCategoryId}
                onChange={(event) =>
                  setParentCategoryId(
                    event.target.value
                  )
                }
              >

                <option value="">
                  없음 (상위 카테고리)
                </option>


                {parentCategories

                  .filter(
                    (category) =>
                      category.categoryId !==
                      editingId
                  )

                  .map((category) => (

                    <option
                      key={
                        category.categoryId
                      }
                      value={
                        category.categoryId
                      }
                    >

                      {
                        category.categoryName
                      }

                    </option>

                  ))}

              </select>

            </div>



            <div className="ac-form-actions">

              <button
                type="button"
                className="ac-cancel-button"
                onClick={
                  handleCloseForm
                }
              >

                취소

              </button>


              <button
                type="submit"
                className="ac-save-button"
              >

                {editingId !== null
                  ? "수정 저장"
                  : "등록"}

              </button>

            </div>


          </form>

        </section>

      )}



      {/* =========================
          목록 패널
      ========================= */}

      <section className="ac-panel">


        {/* 검색 / 필터 */}

        <div className="ac-filter-bar">


          <label className="ac-search-box">

            <FontAwesomeIcon
              icon={faMagnifyingGlass}
            />


            <input
              type="search"
              value={keyword}
              placeholder="카테고리명 또는 ID 검색"
              onChange={(event) =>
                setKeyword(
                  event.target.value
                )
              }
            />

          </label>



          <div className="ac-filter-item">

            <span>
              구분
            </span>

            <select
              value={categoryType}
              onChange={(event) =>
                setCategoryType(
                  event.target.value
                )
              }
            >

              <option value="">
                전체
              </option>

              <option value="PARENT">
                상위 카테고리
              </option>

              <option value="CHILD">
                하위 카테고리
              </option>

            </select>

          </div>



          <div className="ac-filter-item">

            <span>
              상위 카테고리
            </span>

            <select
              value={parentFilter}
              onChange={(event) =>
                setParentFilter(
                  event.target.value
                )
              }
            >

              <option value="">
                전체
              </option>


              {parentCategories.map(
                (category) => (

                  <option
                    key={
                      category.categoryId
                    }
                    value={
                      category.categoryId
                    }
                  >

                    {
                      category.categoryName
                    }

                  </option>

                )
              )}

            </select>

          </div>



          <button
            type="button"
            className="ac-reset-button"
            onClick={handleReset}
          >

            <FontAwesomeIcon
              icon={faRotateRight}
            />

            초기화

          </button>

        </div>



        {/* =========================
            테이블
        ========================= */}

        <div className="ac-table-scroll">

          <table className="ac-table">

            <thead>

              <tr>

                <th>
                  카테고리 ID
                </th>

                <th>
                  카테고리명
                </th>

                <th>
                  구분
                </th>

                <th>
                  상위 카테고리
                </th>

                <th>
                  하위 카테고리 수
                </th>

                <th>
                  관리
                </th>

              </tr>

            </thead>


            <tbody>


              {filteredCategories.map(
                (category) => {

                  const isParent =
                    category.parentCategoryId ===
                    null;


                  return (

                    <tr
                      key={
                        category.categoryId
                      }
                    >


                      <td>

                        <strong className="ac-id">

                          {
                            category.categoryId
                          }

                        </strong>

                      </td>



                      <td>

                        <div className="ac-category-name">

                          <span
                            className={
                              isParent
                                ? "ac-category-icon ac-parent-icon"
                                : "ac-category-icon ac-child-icon"
                            }
                          >

                            <FontAwesomeIcon
                              icon={
                                isParent
                                  ? faFolder
                                  : faTag
                              }
                            />

                          </span>


                          <strong>

                            {
                              category.categoryName
                            }

                          </strong>

                        </div>

                      </td>



                      <td>

                        <span
                          className={
                            isParent
                              ? "ac-type-badge ac-type-parent"
                              : "ac-type-badge ac-type-child"
                          }
                        >

                          {isParent
                            ? "상위 카테고리"
                            : "하위 카테고리"}

                        </span>

                      </td>



                      <td>

                        <span className="ac-parent-name">

                          {
                            getParentName(
                              category.parentCategoryId
                            )
                          }

                        </span>

                      </td>



                      <td>

                        {isParent ? (

                          <strong className="ac-child-count">

                            {
                              getChildCount(
                                category.categoryId
                              )
                            }개

                          </strong>

                        ) : (

                          <span className="ac-none">
                            -
                          </span>

                        )}

                      </td>



                      <td>

                        <div className="ac-actions">


                          <button
                            type="button"
                            className="ac-edit-button"
                            onClick={() =>
                              handleEdit(
                                category
                              )
                            }
                          >

                            <FontAwesomeIcon
                              icon={faPen}
                            />

                            수정

                          </button>



                          <button
                            type="button"
                            className="ac-delete-button"
                            onClick={() =>
                              handleDelete(
                                category
                              )
                            }
                          >

                            <FontAwesomeIcon
                              icon={faTrash}
                            />

                            삭제

                          </button>


                        </div>

                      </td>


                    </tr>

                  );

                }
              )}



              {filteredCategories.length ===
                0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="ac-empty"
                  >

                    조건에 맞는
                    카테고리가 없습니다.

                  </td>

                </tr>

              )}


            </tbody>

          </table>

        </div>



        {/* =========================
            하단
        ========================= */}

        <footer className="ac-table-footer">

          <span>

            총{" "}
            <strong>
              {
                filteredCategories.length
              }
            </strong>
            개 카테고리

          </span>

        </footer>


      </section>

    </div>

  );
}


export default AdminCategories;