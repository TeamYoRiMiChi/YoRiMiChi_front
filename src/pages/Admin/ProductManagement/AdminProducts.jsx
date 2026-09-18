// React 기능
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 화면 컴포넌트
import AdminProductFilter from "../../../components/Admin/ProductManagement/AdminProduct_Filter";
import AdminProductTable from "../../../components/Admin/ProductManagement/AdminProduct_Table";
import AdminProductTableFooter from "../../../components/Admin/ProductManagement/AdminProduct_Footer";
import AdminStatusBox from "../../../components/Admin/common/Admin_statusBox";

// 상품 필터 훅
import useProductFilter from "../../../hooks/Admin/ProductManagement/useProductFilter";

// 관리자 상품 API
import {
  getAdminProducts,
  updateAdminProduct,
} from "../../../api/Admin/ProductManagement/adminProductApi";

// 아이콘
import {
  faBan,
  faBoxOpen,
  faCartShopping,
  faCirclePause,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import "./AdminProducts.css";

/*
 * 카테고리는 아직 임시 데이터 사용
 * 나중에 카테고리 조회 API로 교체
 */
const initialCategories = [
  {
    categoryId: 1,
    categoryName: "수산물",
  },
  {
    categoryId: 2,
    categoryName: "정육·육류",
  },
  {
    categoryId: 3,
    categoryName: "가공식품",
  },
  {
    categoryId: 4,
    categoryName: "과자·디저트",
  },
  {
    categoryId: 5,
    categoryName: "면류",
  },
  {
    categoryId: 6,
    categoryName: "과일",
  },
];

function AdminProducts() {
  const navigate = useNavigate();

  /*
   * 백엔드에서 받은 상품 목록을 저장
   *
   * 기존 initialProducts 대신 빈 배열로 시작한다.
   */
  const [products, setProducts] = useState([]);

  // 선택된 상품 ID
  const [selectedIds, setSelectedIds] =
    useState([]);

  // 현재 페이지
  const [page, setPage] = useState(1);

  const totalPages = 5;

  /*
   * 관리자 상품 전체 조회
   *
   * 관리자 상품관리 화면이 처음 열릴 때
   * GET /api/admin/products를 한 번 실행한다.
   */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response =
          await getAdminProducts();

        /*
         * Axios 설정에 따라 응답 모양이 다를 수 있어서
         * 상품 배열을 안전하게 꺼낸다.
         */
        const body =
          response?.data ?? response;

        const productList =
          Array.isArray(body)
            ? body
            : body?.data;

        console.log(
          "관리자 상품 조회 결과:",
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

  /*
   * 상품 필터 기능
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

  /*
   * 전체 상품 통계
   *
   * products가 변경될 때만 다시 계산한다.
   */
  const summary = useMemo(() => {
    return {
      total: products.length,

      active: products.filter(
        (product) =>
          product.status === "ACTIVE" &&
          product.stock > 0
      ).length,

      soldOut: products.filter(
        (product) =>
          product.status !== "HIDDEN" &&
          (
            product.status === "SOLD_OUT" ||
            product.stock <= 0
          )
      ).length,

      hidden: products.filter(
        (product) =>
          product.status === "HIDDEN"
      ).length,
    };
  }, [products]);

  /*
   * 상단 상품 통계 카드
   */
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

  /*
   * 현재 화면에 표시된 상품 ID
   */
  const visibleIds =
    filteredProducts.map(
      (product) => product.productId
    );

  /*
   * 현재 보이는 상품이
   * 전부 선택됐는지 확인
   */
  const isAllSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) =>
      selectedIds.includes(id)
    );

  /*
   * 현재 화면의 상품 전체 선택
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
   * 상품 한 개 선택
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
   * 현재는 프론트 화면에서만 삭제된다.
   * 실제 DB 삭제 API는 아직 연결하지 않은 상태다.
   */
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      `선택한 상품 ${selectedIds.length}개를 삭제하시겠습니까?`
    );

    if (!confirmed) {
      return;
    }

    setProducts((current) =>
      current.filter(
        (product) =>
          !selectedIds.includes(
            product.productId
          )
      )
    );

    setSelectedIds([]);
  };

  /*
   * 선택 상품 판매 상태 변경
   *
   * 현재는 프론트 화면에서만 변경된다.
   */
  const handleStatusChange = (
    event
  ) => {
    const nextStatus =
      event.target.value;

    if (
      !nextStatus ||
      selectedIds.length === 0
    ) {
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
   * 상품 한 개의 입력값 변경
   *
   * 카테고리, 재고, 상태를 수정할 때
   * products state를 먼저 변경한다.
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
   * 상품 한 개 저장
   *
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

    /*
     * 백엔드의 AdminProductUpdateRequest로
     * 전달할 데이터
     */
    const updateData = {
      categoryId: Number(
        product.categoryId
      ),
      stock: Number(product.stock),
      status: product.status,
    };

    console.log(
      "저장할 상품 ID:",
      productId
    );

    console.log(
      "저장할 데이터:",
      updateData
    );

    try {
      const response =
        await updateAdminProduct(
          productId,
          updateData
        );

      /*
       * 백엔드가 수정된 상품을 반환하면
       * 화면의 해당 상품도 반환값으로 교체한다.
       */
      const body =
        response?.data ?? response;

      const updatedProduct =
        body?.data ?? body;

      if (
        updatedProduct &&
        updatedProduct.productId
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
        "상품 수정에 실패했습니다."
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
            navigate(
              "/admin/products/new"
            )
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
          categories={initialCategories}
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
          products={filteredProducts}
          categories={initialCategories}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          onSelectAll={handleSelectAll}
          onSelectProduct={
            handleSelectProduct
          }
          onChange={
            handleProductChange
          }
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
    </div>
  );
}

export default AdminProducts;