import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBan,
  faBoxOpen,
  faCartShopping,
  faCirclePause,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import AdminProductFilter
  from "../../../components/Admin/ProductManagement/AdminProduct_Filter";

import AdminProductTable
  from "../../../components/Admin/ProductManagement/AdminProduct_Table";

import AdminProductTableFooter
  from "../../../components/Admin/ProductManagement/AdminProduct_Footer";

import AdminProductRegisterModal
  from "../../../components/Admin/ProductManagement/AdminProduct_RegisterModal";

import AdminStatusBox
  from "../../../components/Admin/common/Admin_statusBox";

import useProductFilter
  from "../../../hooks/Admin/ProductManagement/useProductFilter";

import {
  getAdminCategories,
} from "../../../api/Admin/CategoriesManagement/adminCategoryApi";

import {
  createAdminProduct,
  deleteAdminProduct,
  getAdminProducts,
  updateAdminProduct,
} from "../../../api/Admin/ProductManagement/adminProductApi";

import "./AdminProducts.css";



function AdminProducts() {
  // 백엔드에서 조회한 상품
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // 백엔드에서 조회한 카테고리
  // 선택한 상품 ID
  const [selectedIds, setSelectedIds] =
    useState([]);

  // 현재 페이지
  const [page, setPage] = useState(1);

  // 상품 등록 모달 열림 여부
  const [
    isRegisterModalOpen,
    setIsRegisterModalOpen,
  ] = useState(false);

  /*
   * 관리자 상품 전체 조회
   * GET /api/admin/products
   */
// 상품 조회

useEffect(() => {
  const loadProducts = async () => {
    try {
      const response =
        await getAdminProducts();

      const body =
        response?.data ?? response;

      const productList =
        Array.isArray(body)
          ? body
          : body?.data;

      console.log(
        "상품 목록:",
        productList
      );

      setProducts(
        Array.isArray(productList)
          ? productList
          : []
      );
    } catch (error) {
      console.error(
        "관리자 상품 조회 실패:",
        error
      );

      setProducts([]);
    }
  };

  loadProducts();
}, []);

//카테고리조회
useEffect(() => {
  const loadCategories = async () => {
    try {
      const firstResponse =
        await getAdminCategories({
          page: 1,
          size: 10,
        });

      const firstBody =
        firstResponse?.data ?? firstResponse;

      const firstPageData =
        firstBody?.data ?? firstBody;

      const allCategories = [
        ...(firstPageData.content ?? []),
      ];

      const totalPages =
        firstPageData.totalPages ?? 1;

      for (
        let currentPage = 2;
        currentPage <= totalPages;
        currentPage += 1
      ) {
        const response =
          await getAdminCategories({
            page: currentPage,
            size: 10,
          });

        const body =
          response?.data ?? response;

        const pageData =
          body?.data ?? body;

        allCategories.push(
          ...(pageData.content ?? [])
        );
      }

      console.log(
        "전체 카테고리 목록:",
        allCategories
      );

      setCategories(allCategories);
    } catch (error) {
      console.error(
        "카테고리 조회 실패:",
        error
      );

      setCategories([]);
    }
  };

  loadCategories();
}, []);



  /*
   * 상품 필터
   */
  const {
    keyword,
    saleType,
    categoryId,
    status,
    filteredProducts,
    handleKeywordChange,
    handleSaleTypeChange,
    handleCategoryChange,
    handleStatusChange:
      handleFilterStatusChange,
    handleReset,
  } = useProductFilter(
    products,
    setPage
  );

  // 페이지당 상품 수
  const pageSize = 8;

  // 전체 페이지 수
  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length / pageSize
    )
  );

  // 현재 페이지가 전체 페이지를 넘어가면 보정
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // 현재 페이지에 표시할 상품
  const pagedProducts = useMemo(() => {
    const startIndex =
      (page - 1) * pageSize;

    const endIndex =
      startIndex + pageSize;

    return filteredProducts.slice(
      startIndex,
      endIndex
    );
  }, [filteredProducts, page]);

  /*
   * 상품 통계
   */
  const summary = useMemo(() => {
    return {
      total: products.length,

      active: products.filter(
        (product) =>
          product.status === "ACTIVE" &&
          Number(product.stock) > 0
      ).length,

      soldOut: products.filter(
        (product) =>
          product.status !== "HIDDEN" &&
          (
            product.status === "SOLD_OUT" ||
            Number(product.stock) <= 0
          )
      ).length,

      hidden: products.filter(
        (product) =>
          product.status === "HIDDEN"
      ).length,
    };
  }, [products]);

  const summaryItems = [
    {
      key: "total",
      label: "全商品",
      value: summary.total,
      icon: faBoxOpen,
      color: "blue",
    },
    {
      key: "active",
      label: "販売中",
      value: summary.active,
      icon: faCartShopping,
      color: "green",
    },
    {
      key: "soldOut",
      label: "在庫切れ",
      value: summary.soldOut,
      icon: faBan,
      color: "red",
    },
    {
      key: "hidden",
      label: "販売停止",
      value: summary.hidden,
      icon: faCirclePause,
      color: "gray",
    },
  ];

  // 현재 페이지에 보이는 상품 ID
  const visibleIds =
    pagedProducts.map(
      (product) => product.productId
    );

  // 현재 페이지 전체 선택 여부
  const isAllSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) =>
      selectedIds.includes(id)
    );

  /*
   * 현재 페이지 상품 전체 선택
   */
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((current) =>
        current.filter(
          (id) =>
            !visibleIds.includes(id)
        )
      );

      return;
    }

    setSelectedIds((current) => [
      ...new Set([
        ...current,
        ...visibleIds,
      ]),
    ]);
  };

  /*
   * 상품 하나 선택
   */
  const handleSelectProduct = (
    productId
  ) => {
    setSelectedIds((current) => {
      if (current.includes(productId)) {
        return current.filter(
          (id) => id !== productId
        );
      }

      return [
        ...current,
        productId,
      ];
    });
  };

  /*
   * 선택 상품 삭제
   *
   * 현재는 프론트 화면에서만 삭제
   */
  const handleDeleteSelected = async () => {
  if (selectedIds.length === 0) {
    alert("削除する商品を選択してください。");
    return;
  }

  const confirmed = window.confirm(
    `選択した商品${selectedIds.length}件を削除しますか？`
  );

  if (!confirmed) {
    return;
  }

  try {
    await Promise.all(
      selectedIds.map((productId) =>
        deleteAdminProduct(productId)
      )
    );

    setProducts((current) =>
      current.filter(
        (product) =>
          !selectedIds.includes(
            product.productId
          )
      )
    );

    setSelectedIds([]);

    alert("商品を削除しました。");
  } catch (error) {
    console.error(
      "상품 삭제 실패:",
      error
    );

    alert(
      error?.response?.data?.message ??
      "商品の削除に失敗しました。"
    );
  }
};

  /*
   * 선택 상품 상태 변경
   *
   * 현재는 프론트 화면에서만 변경
   */
  const handleStatusChange = (
    event
  ) => {
    const nextStatus =
      event.target.value;

    if (!nextStatus) {
      return;
    }

    if (selectedIds.length === 0) {
      alert("商品を選択してください。");
      event.target.value = "";
      return;
    }

    setProducts((current) =>
      current.map((product) => {
        if (
          !selectedIds.includes(
            product.productId
          )
        ) {
          return product;
        }

        return {
          ...product,
          status: nextStatus,
        };
      })
    );

    event.target.value = "";
    setSelectedIds([]);
  };

  /*
   * 상품 테이블 입력값 변경
   */
  const handleProductChange = (
    productId,
    field,
    value
  ) => {
    setProducts((current) =>
      current.map((product) => {
        if (
          product.productId !==
          productId
        ) {
          return product;
        }

        return {
          ...product,
          [field]: value,
        };
      })
    );
  };

  /*
   * 상품 한 개 수정 저장
   * PATCH /api/admin/products/{productId}
   */
  const handleProductSave = async (
    productId
  ) => {
    const product = products.find(
      (item) =>
        item.productId === productId
    );

    if (!product) {
      alert("商品が見つかりません。");
      return;
    }

    if (
      product.stock === "" ||
      Number(product.stock) < 0
    ) {
      alert(
        "在庫は0以上の数値を入力してください。"
      );
      return;
    }

 if (
  product.priceJpy === "" ||
  Number(product.priceJpy) < 0
) {
  alert(
    "販売価格は0以上の数値を入力してください。"
  );
  return;
}

const updateData = {
  categoryId: Number(
    product.categoryId
  ),

  priceJpy: Number(
    product.priceJpy
  ),

  originalPriceJpy:
    product.originalPriceJpy === "" ||
    product.originalPriceJpy == null
      ? null
      : Number(
          product.originalPriceJpy
        ),

  stock: Number(product.stock),
  status: product.status,
};

    try {
      const response =
        await updateAdminProduct(
          productId,
          updateData
        );

      const body =
        response?.data ?? response;

      const updatedProduct =
        body?.data ?? body;

      if (
        updatedProduct?.productId
      ) {
        setProducts((current) =>
          current.map((item) =>
            item.productId === productId
              ? updatedProduct
              : item
          )
        );
      }

      alert(
        "商品情報を保存しました。"
      );
    } catch (error) {
      console.error(
        "상품 수정 실패:",
        error
      );

      alert(
        error?.response?.data?.message ??
        "商品の更新に失敗しました。"
      );
    }
  };

  /*
 * 상품 등록
 * POST /api/admin/products
 */
const handleRegisterProduct = async (
  registerData
) => {
  try {
    const response =
      await createAdminProduct(registerData);

    const createdProduct =
      response.data?.data ?? response.data;

    setProducts((current) => [
      createdProduct,
      ...current,
    ]);

    setPage(1);
    setIsRegisterModalOpen(false);

    alert("商品を登録しました。");
  } catch (error) {
    console.error("상품 등록 실패:", error);

    alert(
      error.response?.data?.message ??
      "商品登録に失敗しました。"
    );
  }
};

  return (
    <div className="ap-page">
      <header className="ap-page-header">
        <div>
          <h2>商品管理</h2>

          <p>
            登録済みの商品と在庫状況を
            管理します。
          </p>
        </div>

        <button
          className="ap-register-button"
          type="button"
          onClick={() =>
            setIsRegisterModalOpen(true)
          }
        >
          <FontAwesomeIcon
            icon={faPlus}
          />

          商品登録
        </button>
      </header>

      <AdminStatusBox
        items={summaryItems}
      />

      <section className="ap-panel">
        <AdminProductFilter
          keyword={keyword}
          saleType={saleType}
          categoryId={categoryId}
          status={status}
          categories={categories}
          onKeywordChange={
            handleKeywordChange
          }
          onSaleTypeChange={
            handleSaleTypeChange
          }
          onCategoryChange={
            handleCategoryChange
          }
          onStatusChange={
            handleFilterStatusChange
          }
          onReset={handleReset}
        />

        <AdminProductTable
  products={pagedProducts}
  categories={categories}
  selectedIds={selectedIds}
  isAllSelected={isAllSelected}
  onSelectAll={handleSelectAll}
  onSelectProduct={handleSelectProduct}
  onChange={handleProductChange}
  onSave={handleProductSave}
/>
        <AdminProductTableFooter
          selectedCount={
            selectedIds.length
          }
          totalCount={
            filteredProducts.length
          }
          isAllSelected={isAllSelected}
          page={page}
          totalPages={totalPages}
          onSelectAll={handleSelectAll}
          onDelete={
            handleDeleteSelected
          }
          onStatusChange={
            handleStatusChange
          }
          onPageChange={setPage}
        />
      </section>

      {isRegisterModalOpen && (
        <AdminProductRegisterModal
          categories={categories}
          onClose={() =>
            setIsRegisterModalOpen(false)
          }
          onRegister={
            handleRegisterProduct
          }
        />
      )}
    </div>
  );
}

export default AdminProducts;
