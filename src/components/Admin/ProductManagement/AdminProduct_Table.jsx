import AdminProduct_Select from "./AdminProduct_Select";
import AdminProduct_Stock from "./AdminProduct_Stock";

const saleTypeText = {
  OVERSEAS: "해외직구",
  GROUP_BUY: "공동구매",
};

const statusOptions = [
  {
    value: "ACTIVE",
    label: "판매 중",
  },
  {
    value: "SOLD_OUT",
    label: "품절",
  },
  {
    value: "HIDDEN",
    label: "판매 중지",
  },
];

function AdminProductTable({
  products,
  categories,
  selectedIds,
  isAllSelected,
  onSelectAll,
  onSelectProduct,
  onChange,
  onSave,
}) {
  return (
    <div className="ap-table-scroll">
      <table className="ap-table">
        <thead>
          <tr>
            <th className="ap-checkbox-cell">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onSelectAll}
                aria-label="전체 상품 선택"
              />
            </th>

            <th>상품 정보</th>
            <th>상품 ID</th>
            <th>판매 유형</th>
            <th>카테고리</th>
            <th>판매가(¥)</th>
            <th>재고</th>
            <th>판매 상태</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              {/* 상품 선택 */}
              <td className="ap-checkbox-cell">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(
                    product.productId
                  )}
                  onChange={() =>
                    onSelectProduct(product.productId)
                  }
                  aria-label={`${product.productName} 선택`}
                />
              </td>

              {/* 상품 정보 */}
              <td>
                <div className="ap-product-info">
                  <img
                    src={product.thumbnailUrl}
                    alt={product.productName}
                  />

                  <div>
                    <strong>
                      {product.productName}
                    </strong>

                    <p>
                      <span>
                        {product.productNameJp}
                      </span>

                      <i />

                      <span>
                        {product.brand}
                      </span>
                    </p>
                  </div>
                </div>
              </td>

              {/* 상품 ID */}
              <td className="ap-product-id">
                {product.productId}
              </td>

              {/* 판매 유형 */}
              <td>
                <span
                  className={`ap-type-badge ${product.saleType === "OVERSEAS"
                      ? "ap-type-overseas"
                      : "ap-type-group"
                    }`}
                >
                  {saleTypeText[product.saleType]}
                </span>
              </td>

              {/* 카테고리 변경 */}
              <td>
                <AdminProduct_Select
                  className="ap-edit-select"
                  value={product.categoryId}
                  options={categories.map(
                    (category) => ({
                      value: category.categoryId,
                      label: category.categoryName,
                    })
                  )}
                  onChange={(value) =>
                    onChange(
                      product.productId,
                      "categoryId",
                      Number(value)
                    )
                  }
                />
              </td>

              {/* 판매 가격 */}
              <td className="ap-price">
                ¥
                {Number(
                  product.priceJpy ?? 0
                ).toLocaleString()}
              </td>

              {/* 재고 변경 */}
              <td>
                <AdminProduct_Stock
                  productId={product.productId}
                  productName={product.productName}
                  stock={product.stock}
                  onChange={onChange}
                />
              </td>

              {/* 판매 상태 변경 및 저장 */}
              <td>
                <div className="ap-status-edit">
                  <AdminProduct_Select
                    className="ap-edit-select"
                    value={product.status}
                    options={statusOptions}
                    onChange={(value) =>
                      onChange(
                        product.productId,
                        "status",
                        value
                      )
                    }
                  />

                  <button
                    type="button"
                    className="ap-edit-button"
                    onClick={() =>
                      onSave(product.productId)
                    }
                  >
                    수정하기
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td
                className="ap-empty-result"
                colSpan={8}
              >
                조건에 맞는 상품이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductTable;