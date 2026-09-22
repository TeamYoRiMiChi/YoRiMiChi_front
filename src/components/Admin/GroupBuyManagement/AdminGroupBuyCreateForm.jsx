import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

const initialForm = {
  title: "",
  description: "",
  targetQuantity: "",
  startDate: "",
  endDate: "",
};

// "공동구매 등록" 버튼을 누르면 카테고리 관리 페이지처럼 헤더 아래에 펼쳐지는 등록 폼.
// 상품을 새로 만들지 않고, 이미 판매유형이 GROUP_BUY로 등록된 기존 상품을 검색해서
// 골라 새 모집 라운드(GROUP_BUY 행)만 생성합니다 (POST /admin/group-buys).
function AdminGroupBuyCreateForm({ products = [], isSaving, onSubmit, onClose }) {
  const [productKeyword, setProductKeyword] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const filteredProducts = useMemo(() => {
    const normalized = productKeyword.trim().toLowerCase();

    if (!normalized) {
      return products;
    }

    return products.filter((product) =>
      [product.productName, product.productNameJp, product.brand]
        .filter(Boolean)
        .some((text) => text.toLowerCase().includes(normalized)),
    );
  }, [products, productKeyword]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setIsPickerOpen(false);
    setProductKeyword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedProduct) {
      alert("공동구매를 진행할 상품을 선택해 주세요.");
      return;
    }

    if (!formData.title.trim()) {
      alert("공동구매 제목을 입력해 주세요.");
      return;
    }

    if (formData.targetQuantity === "" || Number(formData.targetQuantity) < 1) {
      alert("목표 수량은 1개 이상이어야 합니다.");
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      alert("모집 기간을 입력해 주세요.");
      return;
    }

    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      alert("모집 마감일은 시작일보다 뒤여야 합니다.");
      return;
    }

    const ok = await onSubmit({
      productId: selectedProduct.productId,
      title: formData.title.trim(),
      description: formData.description.trim(),
      targetQuantity: Number(formData.targetQuantity),
      startDate: formData.startDate,
      endDate: formData.endDate,
    });

    if (ok) {
      setFormData(initialForm);
      setSelectedProduct(null);
    }
  };

  return (
    <section className="agb-form-panel">
      <div className="agb-form-header">
        <div>
          <h3>공동구매 등록</h3>
          <p>이미 등록된 공동구매 상품을 골라 새 모집 라운드를 엽니다.</p>
        </div>

        <button
          type="button"
          className="agb-form-close"
          onClick={onClose}
          disabled={isSaving}
          aria-label="폼 닫기"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <form className="agb-create-form" onSubmit={handleSubmit}>
        <div className="agb-form-product-picker">
          <span className="agb-form-picker-label">상품</span>

          {selectedProduct ? (
            <div className="agb-form-selected-product">
              <img
                src={selectedProduct.thumbnailUrl || undefined}
                alt={selectedProduct.productName}
              />

              <div>
                <strong>{selectedProduct.productName}</strong>
                <span>{selectedProduct.productNameJp}</span>
                <span>¥{Number(selectedProduct.priceJpy ?? 0).toLocaleString()}</span>
              </div>

              <button
                type="button"
                className="agb-form-picker-change"
                onClick={() => {
                  setSelectedProduct(null);
                  setIsPickerOpen(true);
                }}
                disabled={isSaving}
              >
                변경
              </button>
            </div>
          ) : (
            <div className="agb-form-picker-box">
              <label className="agb-search-box">
                <FontAwesomeIcon icon={faMagnifyingGlass} />

                <input
                  type="search"
                  value={productKeyword}
                  onChange={(event) => {
                    setProductKeyword(event.target.value);
                    setIsPickerOpen(true);
                  }}
                  onFocus={() => setIsPickerOpen(true)}
                  placeholder="상품명, 일본어 상품명 또는 브랜드로 검색"
                  disabled={isSaving}
                />
              </label>

              {isPickerOpen && (
                <ul className="agb-form-picker-list">
                  {filteredProducts.length === 0 && (
                    <li className="agb-form-picker-empty">
                      판매유형이 "공동구매"인 상품이 없습니다.
                    </li>
                  )}

                  {filteredProducts.map((product) => (
                    <li key={product.productId}>
                      <button
                        type="button"
                        onClick={() => handleSelectProduct(product)}
                      >
                        <img
                          src={product.thumbnailUrl || undefined}
                          alt={product.productName}
                        />

                        <div>
                          <strong>{product.productName}</strong>
                          <span>{product.productNameJp}</span>
                        </div>

                        <b>¥{Number(product.priceJpy ?? 0).toLocaleString()}</b>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="agb-form-grid">
          <label className="agb-form-full">
            <span>공동구매 제목</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="공동구매 제목"
              disabled={isSaving}
              required
            />
          </label>

          <label className="agb-form-full">
            <span>공동구매 설명</span>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="공동구매 설명"
              disabled={isSaving}
            />
          </label>

          <label>
            <span>목표 수량</span>
            <input
              type="number"
              name="targetQuantity"
              value={formData.targetQuantity}
              onChange={handleChange}
              min="1"
              placeholder="100"
              disabled={isSaving}
              required
            />
          </label>

          <label>
            <span>모집 시작일</span>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              disabled={isSaving}
              required
            />
          </label>

          <label>
            <span>모집 마감일</span>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              disabled={isSaving}
              required
            />
          </label>
        </div>

        <div className="agb-form-actions">
          <button
            type="button"
            className="agb-form-cancel-button"
            onClick={onClose}
            disabled={isSaving}
          >
            취소
          </button>

          <button type="submit" className="agb-form-save-button" disabled={isSaving}>
            {isSaving ? "등록 중..." : "등록"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AdminGroupBuyCreateForm;
