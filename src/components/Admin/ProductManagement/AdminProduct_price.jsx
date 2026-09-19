function AdminProduct_Price({
  productId,
  productName,
  price,
  onChange,
}) {
  return (
    <details className="ap-stock-dropdown">
      <summary className="ap-stock-summary">
        <span>
          ¥
          {price === "" || price == null
            ? "-"
            : Number(price).toLocaleString()}
        </span>

        <span className="ap-stock-arrow">
          ▼
        </span>
      </summary>

      <div className="ap-stock-popup">
        <label htmlFor={`price-${productId}`}>
          판매 가격
        </label>

        <input
          id={`price-${productId}`}
          type="number"
          min="0"
          step="1"
          value={price ?? ""}
          aria-label={`${productName} 판매 가격 입력`}
          onChange={(event) =>
            onChange(
              productId,
              "priceJpy",
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

export default AdminProduct_Price;