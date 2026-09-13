import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faBoxOpen,
  faCartShopping,
  faChevronLeft,
  faChevronRight,
  faCirclePause,
  faMagnifyingGlass,
  faPlus,
  faRotateRight,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminProducts.css";

const initialCategories = [
  { categoryId: 1, categoryName: "수산물" },
  { categoryId: 2, categoryName: "정육·육류" },
  { categoryId: 3, categoryName: "가공식품" },
  { categoryId: 4, categoryName: "과자·디저트" },
  { categoryId: 5, categoryName: "면류" },
  { categoryId: 6, categoryName: "과일" },
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

const saleTypeText = {
  OVERSEAS: "해외직구",
  GROUP_BUY: "공동구매",
};

const statusText = {
  ACTIVE: "판매 중",
  SOLD_OUT: "품절",
  HIDDEN: "판매 중지",
};

function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(initialProducts);
  const [keyword, setKeyword] = useState("");
  const [saleType, setSaleType] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);

  const summary = useMemo(() => {
    return {
      total: products.length,
      active: products.filter(
        (product) => product.status === "ACTIVE" && product.stock > 0
      ).length,
      soldOut: products.filter(
        (product) =>
          product.status === "SOLD_OUT" || product.stock === 0
      ).length,
      hidden: products.filter(
        (product) => product.status === "HIDDEN"
      ).length,
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return products.filter((product) => {
      const keywordMatches =
        !normalizedKeyword ||
        product.productName.toLowerCase().includes(normalizedKeyword) ||
        product.productNameJp.toLowerCase().includes(normalizedKeyword) ||
        product.brand.toLowerCase().includes(normalizedKeyword);

      const saleTypeMatches =
        !saleType || product.saleType === saleType;

      const categoryMatches =
        !categoryId ||
        product.categoryId === Number(categoryId);

      const statusMatches =
        !status || product.status === status;

      return (
        keywordMatches &&
        saleTypeMatches &&
        categoryMatches &&
        statusMatches
      );
    });
  }, [products, keyword, saleType, categoryId, status]);

  const visibleIds = filteredProducts.map(
    (product) => product.productId
  );

  const isAllSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedIds.includes(id));

  const getCategoryName = (id) => {
    return (
      initialCategories.find(
        (category) => category.categoryId === id
      )?.categoryName ?? "-"
    );
  };

  const getDisplayedStatus = (product) => {
    if (product.status === "HIDDEN") {
      return "HIDDEN";
    }

    if (product.status === "SOLD_OUT" || product.stock <= 0) {
      return "SOLD_OUT";
    }

    return "ACTIVE";
  };

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
    setPage(1);
  };

  const handleReset = () => {
    setKeyword("");
    setSaleType("");
    setCategoryId("");
    setStatus("");
    setPage(1);
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((current) =>
        current.filter((id) => !visibleIds.includes(id))
      );
      return;
    }

    setSelectedIds((current) => [
      ...new Set([...current, ...visibleIds]),
    ]);
  };

  const handleSelectProduct = (productId) => {
    setSelectedIds((current) => {
      if (current.includes(productId)) {
        return current.filter((id) => id !== productId);
      }

      return [...current, productId];
    });
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;

    const confirmed = window.confirm(
      `선택한 상품 ${selectedIds.length}개를 삭제하시겠습니까?`
    );

    if (!confirmed) return;

    setProducts((current) =>
      current.filter(
        (product) => !selectedIds.includes(product.productId)
      )
    );

    setSelectedIds([]);
  };

  const handleStatusChange = (event) => {
    const nextStatus = event.target.value;

    if (!nextStatus || selectedIds.length === 0) return;

    setProducts((current) =>
      current.map((product) => {
        if (!selectedIds.includes(product.productId)) {
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
          <p>등록된 상품과 재고 상태를 관리하세요.</p>
        </div>

        <button
          className="ap-register-button"
          type="button"
          onClick={() => navigate("/admin/products/new")}
        >
          <FontAwesomeIcon icon={faPlus} />
          상품 등록
        </button>
      </header>

      <section className="ap-summary-grid">
        <SummaryCard
          label="전체 상품"
          count={summary.total}
          icon={faBoxOpen}
          color="blue"
        />

        <SummaryCard
          label="판매 중"
          count={summary.active}
          icon={faCartShopping}
          color="green"
        />

        <SummaryCard
          label="품절"
          count={summary.soldOut}
          icon={faBan}
          color="red"
        />

        <SummaryCard
          label="판매 중지"
          count={summary.hidden}
          icon={faCirclePause}
          color="gray"
        />
      </section>

      <section className="ap-panel">
        <div className="ap-filter-bar">
          <label className="ap-search-box">
            <FontAwesomeIcon icon={faMagnifyingGlass} />

            <input
              type="search"
              value={keyword}
              onChange={handleFilterChange(setKeyword)}
              placeholder="상품명 또는 브랜드로 검색하세요."
            />
          </label>

          <div className="ap-filter-item">
            <span>판매 유형</span>

            <select
              value={saleType}
              onChange={handleFilterChange(setSaleType)}
            >
              <option value="">전체</option>
              <option value="OVERSEAS">해외직구</option>
              <option value="GROUP_BUY">공동구매</option>
            </select>
          </div>

          <div className="ap-filter-item">
            <span>카테고리</span>

            <select
              value={categoryId}
              onChange={handleFilterChange(setCategoryId)}
            >
              <option value="">전체</option>

              {initialCategories.map((category) => (
                <option
                  key={category.categoryId}
                  value={category.categoryId}
                >
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="ap-filter-item">
            <span>판매 상태</span>

            <select
              value={status}
              onChange={handleFilterChange(setStatus)}
            >
              <option value="">전체</option>
              <option value="ACTIVE">판매 중</option>
              <option value="SOLD_OUT">품절</option>
              <option value="HIDDEN">판매 중지</option>
            </select>
          </div>

          <button
            className="ap-reset-button"
            type="button"
            onClick={handleReset}
          >
            <FontAwesomeIcon icon={faRotateRight} />
            초기화
          </button>
        </div>

        <div className="ap-table-scroll">
          <table className="ap-table">
            <thead>
              <tr>
                <th className="ap-checkbox-cell">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    aria-label="전체 상품 선택"
                  />
                </th>

                <th>상품 정보</th>
                <th>상품 ID</th>
                <th>판매 유형</th>
                <th>카테고리</th>
                <th>판매가(¥)</th>
                <th>재고</th>
                <th>누적 판매량</th>
                <th>판매 상태</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => {
                const displayedStatus =
                  getDisplayedStatus(product);

                return (
                  <tr key={product.productId}>
                    <td className="ap-checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(
                          product.productId
                        )}
                        onChange={() =>
                          handleSelectProduct(product.productId)
                        }
                        aria-label={`${product.productName} 선택`}
                      />
                    </td>

                    <td>
                      <div className="ap-product-info">
                        <img
                          src={product.thumbnailUrl}
                          alt={product.productName}
                        />

                        <div>
                          <strong>{product.productName}</strong>

                          <p>
                            <span>{product.productNameJp}</span>
                            <i />
                            <span>{product.brand}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="ap-product-id">
                      {product.productId}
                    </td>

                    <td>
                      <span
                        className={`ap-type-badge ${
                          product.saleType === "OVERSEAS"
                            ? "ap-type-overseas"
                            : "ap-type-group"
                        }`}
                      >
                        {saleTypeText[product.saleType]}
                      </span>
                    </td>

                    <td>
                      {getCategoryName(product.categoryId)}
                    </td>

                    <td className="ap-price">
                      ¥{product.priceJpy.toLocaleString()}
                    </td>

                    <td
                      className={
                        product.stock === 0
                          ? "ap-stock ap-stock-empty"
                          : product.stock <= 8
                            ? "ap-stock ap-stock-low"
                            : "ap-stock"
                      }
                    >
                      {product.stock}
                    </td>

                    <td>{product.salesCount}</td>

                    <td>
                      <span
                        className={`ap-status-badge ap-status-${displayedStatus.toLowerCase()}`}
                      >
                        {statusText[displayedStatus]}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    className="ap-empty-result"
                    colSpan={9}
                  >
                    조건에 맞는 상품이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="ap-table-footer">
          <div className="ap-bulk-actions">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
              aria-label="전체 상품 선택"
            />

            <button
              className="ap-delete-button"
              type="button"
              disabled={selectedIds.length === 0}
              onClick={handleDeleteSelected}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              선택 삭제
            </button>

            <select
              className="ap-status-select"
              defaultValue=""
              disabled={selectedIds.length === 0}
              onChange={handleStatusChange}
            >
              <option value="" disabled>
                판매 상태 변경
              </option>
              <option value="ACTIVE">판매 중</option>
              <option value="SOLD_OUT">품절</option>
              <option value="HIDDEN">판매 중지</option>
            </select>

            <span className="ap-total-text">
              총 {filteredProducts.length}개 상품
            </span>
          </div>

          <div className="ap-pagination">
            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage((current) => Math.max(1, current - 1))
              }
              aria-label="이전 페이지"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {[1, 2, 3, 4, 5].map((pageNumber) => (
              <button
                className={
                  page === pageNumber ? "ap-page-active" : ""
                }
                type="button"
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                setPage((current) => Math.min(5, current + 1))
              }
              disabled={page === 5}
              aria-label="다음 페이지"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}

function SummaryCard({ label, count, icon, color }) {
  return (
    <article className={`ap-summary-card ap-summary-${color}`}>
      <div className="ap-summary-icon">
        <FontAwesomeIcon icon={icon} />
      </div>

      <div>
        <span>{label}</span>
        <strong>{count}</strong>
      </div>
    </article>
  );
}

export default AdminProducts;