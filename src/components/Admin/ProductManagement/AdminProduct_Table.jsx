import AdminProduct_Select from "./AdminProduct_Select";
import AdminProduct_Stock from "./AdminProduct_Stock";
import AdminProduct_Price
  from "./AdminProduct_Price";
const saleTypeText = {
  OVERSEAS: "海外直購",
  GROUP_BUY: "共同購入",
};

const statusOptions = [
  {
    value: "ACTIVE",
    label: "販売中",
  },
  {
    value: "SOLD_OUT",
    label: "在庫切れ",
  },
  {
    value: "HIDDEN",
    label: "販売停止",
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
                aria-label="全商品選択"
              />
            </th>

            <th>商品情報</th>
            <th>商品ID</th>
            <th>販売種別</th>
            <th>カテゴリ</th>
            <th>販売価格(¥)</th>
            <th>在庫</th>
            <th>販売ステータス</th>
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
                  aria-label={`${product.productName} を選択`}
                />
              </td>

              {/* 상품 정보 */}
              <td>
                <div className="ap-product-info">
                  <img
                    src={product.thumbnailUrl || undefined}
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

              {/* 카테고리 표시 */}
<td>
  {(() => {
    const category = categories.find(
      (item) =>
        Number(
          item.categoryId ?? item.id
        ) === Number(product.categoryId)
    );

    return (
      category?.categoryName ??
      category?.name ??
      "カテゴリなし"
    );
  })()}
</td>

  {/* 판매 가격 변경 */}
<td className="ap-price">
  <AdminProduct_Price
    productId={product.productId}
    productName={product.productName}
    price={product.priceJpy}
    onChange={onChange}
  />
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
                    保存
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
                条件に合う商品がありません。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProductTable;
