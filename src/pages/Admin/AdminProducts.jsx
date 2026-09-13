import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminProductFilter from "../../components/Admin/AdminProduct_Filter";
import AdminProductTable from "../../components/Admin/AdminProduct_Table";
import AdminProductTableFooter from "../../components/Admin/AdminProduct_Footer";
import useProductFilter from "../../hooks/Admin/useProductFilter";
import {
  faBan,
  faBoxOpen,
  faCartShopping,

  faCirclePause,
  faPlus
 
} from "@fortawesome/free-solid-svg-icons";

import AdminStatusBox from "../../components/Admin/Admin_statusBox";
import "./AdminProducts.css";

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

const initialProducts = [
  {
    productId: 1024,
    categoryId: 1,
    saleType: "OVERSEAS",
    brand: "홋카이도",
    productName: "홋카이도 연어 사시미",
    productNameJp: "北海道サーモン刺身",
    priceJpy: 4200,
    stock: 24,
    salesCount: 128,
    status: "ACTIVE",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=160&h=140&fit=crop",
  },
  {
    productId: 1023,
    categoryId: 2,
    saleType: "GROUP_BUY",
    brand: "고베",
    productName: "일본 와규 등심",
    productNameJp: "和牛サーロイン",
    priceJpy: 8900,
    stock: 8,
    salesCount: 94,
    status: "ACTIVE",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=160&h=140&fit=crop",
  },
  {
    productId: 1022,
    categoryId: 3,
    saleType: "OVERSEAS",
    brand: "이치란",
    productName: "이치란 돈코츠 라멘",
    productNameJp: "一蘭とんこつラーメン",
    priceJpy: 3200,
    stock: 0,
    salesCount: 201,
    status: "SOLD_OUT",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=160&h=140&fit=crop",
  },
  {
    productId: 1021,
    categoryId: 4,
    saleType: "GROUP_BUY",
    brand: "우지",
    productName: "우지 말차 초콜릿",
    productNameJp: "宇治抹茶チョコレート",
    priceJpy: 2600,
    stock: 15,
    salesCount: 67,
    status: "ACTIVE",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=160&h=140&fit=crop",
  },
  {
    productId: 1020,
    categoryId: 4,
    saleType: "OVERSEAS",
    brand: "후쿠오카",
    productName: "딸기 모찌",
    productNameJp: "いちご大福",
    priceJpy: 3800,
    stock: 6,
    salesCount: 52,
    status: "HIDDEN",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=160&h=140&fit=crop",
  },
  {
    productId: 1019,
    categoryId: 5,
    saleType: "OVERSEAS",
    brand: "사누키",
    productName: "사누키 우동 세트",
    productNameJp: "讃岐うどんセット",
    priceJpy: 2500,
    stock: 3,
    salesCount: 83,
    status: "ACTIVE",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=160&h=140&fit=crop",
  },
];



function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(initialProducts);

  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const totalPages = 5;
const {
  keyword,
  saleType,
  categoryId,
  status,
  filteredProducts,
  handleKeywordChange,
  handleSaleTypeChange,
  handleCategoryChange,
  handleStatusChange: handleFilterStatusChange,
  handleReset,
  getDisplayedStatus,
} = useProductFilter(products, setPage);
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
          (product.status === "SOLD_OUT" ||
            product.stock <= 0)
      ).length,

      hidden: products.filter(
        (product) => product.status === "HIDDEN"
      ).length,
    };
  }, [products]);

  /*
   * AdminStatusBox에 전달할 카드 데이터
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
  const visibleIds = filteredProducts.map(
    (product) => product.productId
  );

  /*
   * 현재 보이는 상품이 전부 선택됐는지 확인
   */
  const isAllSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) =>
      selectedIds.includes(id)
    );

  

  


  
  /*
   * 전체 상품 선택
   */
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((current) =>
        current.filter(
          (id) => !visibleIds.includes(id)
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
  const handleSelectProduct = (productId) => {
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
          !selectedIds.includes(product.productId)
      )
    );

    setSelectedIds([]);
  };

  /*
   * 선택 상품 판매 상태 변경
   */
  const handleStatusChange = (event) => {
    const nextStatus = event.target.value;

    if (
      !nextStatus ||
      selectedIds.length === 0
    ) {
      return;
    }

    setProducts((current) =>
      current.map((product) => {
        if (
          !selectedIds.includes(product.productId)
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

  return (
    <div className="ap-page">
      <header className="ap-page-header">
        <div>
          <h2>상품 관리</h2>

          <p>
            등록된 상품과 재고 상태를 관리하세요.
          </p>
        </div>

        <button
          className="ap-register-button"
          type="button"
          onClick={() =>
            navigate("/admin/products/new")
          }
        >
          <FontAwesomeIcon icon={faPlus} />
          상품 등록
        </button>
      </header>

      <AdminStatusBox items={summaryItems} />

      <section className="ap-panel">
     <AdminProductFilter
  keyword={keyword}
  saleType={saleType}
  categoryId={categoryId}
  status={status}
  categories={initialCategories}
  onKeywordChange={handleKeywordChange}
  onSaleTypeChange={handleSaleTypeChange}
  onCategoryChange={handleCategoryChange}
  onStatusChange={handleFilterStatusChange}
  onReset={handleReset}
/>
        

        <AdminProductTable
          products={filteredProducts}
          categories={initialCategories}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          onSelectAll={handleSelectAll}
          onSelectProduct={handleSelectProduct}
          getDisplayedStatus={getDisplayedStatus}
        />

        <AdminProductTableFooter
          selectedCount={selectedIds.length}
          totalCount={filteredProducts.length}
          isAllSelected={isAllSelected}
          page={page}
          totalPages={totalPages}
          onSelectAll={handleSelectAll}
          onDelete={handleDeleteSelected}
          onStatusChange={handleStatusChange}
          onPageChange={setPage}
        />
      </section>
    </div>
  );
}

export default AdminProducts;