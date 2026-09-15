const saleTypeText = {
  OVERSEAS: "해외직구",
  GROUP_BUY: "공동구매",
};

const statusText = {
  ACTIVE: "판매 중",
  SOLD_OUT: "품절",
  HIDDEN: "판매 중지",
};

function AdminProductTable({
  products,
  categories,
  selectedIds,
  isAllSelected,
  onSelectAll,
  onSelectProduct,
  getDisplayedStatus,
}) {
  /*
   * 상품의 categoryId를 카테고리 이름으로 변경
   */
  const getCategoryName = (categoryId) => {
    const category = categories.find(
      (item) => item.categoryId === categoryId
    );

    return category?.categoryName ?? "-";
  };

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
            <th>누적 판매량</th>
            <th>판매 상태</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
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
                      onSelectProduct(product.productId)
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
                      <strong>
                        {product.productName}
                      </strong>

                      <p>
                        <span>
                          {product.productNameJp}
                        </span>

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

          {products.length === 0 && (
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
  );
}

export default AdminProductTable;