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
          재고 수량
        </label>

        <input
          id={`stock-${productId}`}
          type="number"
          min="0"
          value={stock}
          aria-label={`${productName} 재고 입력`}
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

        <p>수정하기 버튼으로 저장</p>
      </div>
    </details>
  );
}

export default AdminProduct_Stock;