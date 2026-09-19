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
      label: "전체 상품",
      value: summary.total,
      icon: faBoxOpen,
      color: "blue",
    },
    {
      key: "active",
      label: "판매 중",
      value: summary.active,
      icon: faCartShopping,
      color: "green",
    },
    {
      key: "soldOut",
      label: "품절",
      value: summary.soldOut,
      icon: faBan,
      color: "red",
    },
    {
      key: "hidden",
      label: "판매 중지",
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
    alert("삭제할 상품을 선택해 주세요.");
    return;
  }

  const confirmed = window.confirm(
    `선택한 상품 ${selectedIds.length}개를 삭제하시겠습니까?`
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

    alert("상품이 삭제되었습니다.");
  } catch (error) {
    console.error(
      "상품 삭제 실패:",
      error
    );

    alert(
      error?.response?.data?.message ??
      "상품 삭제에 실패했습니다."
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
      alert("상품을 선택해 주세요.");
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
      alert("상품을 찾을 수 없습니다.");
      return;
    }

    if (
      product.stock === "" ||
      Number(product.stock) < 0
    ) {
      alert(
        "재고는 0 이상의 숫자로 입력해 주세요."
      );
      return;
    }

 if (
  product.priceJpy === "" ||
  Number(product.priceJpy) < 0
) {
  alert(
    "판매가는 0 이상의 숫자로 입력해 주세요."
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
        "상품 정보가 저장되었습니다."
      );
    } catch (error) {
      console.error(
        "상품 수정 실패:",
        error
      );

      alert(
        error?.response?.data?.message ??
        "상품 수정에 실패했습니다."
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

    alert("상품이 등록되었습니다.");
  } catch (error) {
    console.error("상품 등록 실패:", error);

    alert(
      error.response?.data?.message ??
      "상품 등록에 실패했습니다."
    );
  }
};

  return (
    <div className="ap-page">
      <header className="ap-page-header">
        <div>
          <h2>상품 관리</h2>

          <p>
            등록된 상품과 재고 상태를
            관리하세요.
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

          상품 등록
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
