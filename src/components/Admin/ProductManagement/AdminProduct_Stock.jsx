function AdminProduct_Stock({
  productId,
  productName,
  stock,
  onChange,
}) {
  return (
    <details className="ap-stock-dropdown">
      {/* 현재 재고와 화살표 */}
      <summary className="ap-stock-summary">
        <span>{stock === "" ? "-" : stock}</span>
        <span className="ap-stock-arrow">▼</span>
      </summary>

      {/* 화살표를 누르면 아래에 뜨는 입력창 */}
      <div className="ap-stock-popup">
        <label htmlFor={`stock-${productId}`}>
          在庫数
        </label>

        <input
          id={`stock-${productId}`}
          type="number"
          min="0"
          value={stock}
          aria-label={`${productName} の在庫数を入力`}
          onChange={(event) =>
            onChange(
              productId,
              "stock",
              event.target.value === ""
                ? ""
                : Number(event.target.value)
            )
          }
        />

        <p>保存ボタンを押すと反映されます</p>
      </div>
    </details>
  );
}

export default AdminProduct_Stock;
