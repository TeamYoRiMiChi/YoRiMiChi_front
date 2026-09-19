import { useState } from "react";
import "../../../assets/styles/Admin/ProductManagement/AdminProduct_RegisterModal.css";

const initialForm = {
  categoryId: "",
  saleType: "OVERSEAS",
  brand: "",
  productName: "",
  productNameJp: "",
  priceJpy: "",
  originalPriceJpy: "",
  stock: "",
  thumbnailUrl: "",
  status: "ACTIVE",
};

function AdminProductRegisterModal({
  categories = [],
  onClose,
  onRegister,
}) {
  const [formData, setFormData] =
    useState(initialForm);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.categoryId) {
      alert("카테고리를 선택해 주세요.");
      return;
    }

    if (!formData.productName.trim()) {
      alert("상품명을 입력해 주세요.");
      return;
    }

    if (Number(formData.priceJpy) < 0) {
      alert("가격은 0 이상이어야 합니다.");
      return;
    }

    if (Number(formData.stock) < 0) {
      alert("재고는 0 이상이어야 합니다.");
      return;
    }

    const registerData = {
      categoryId: Number(formData.categoryId),
      saleType: formData.saleType,
      brand: formData.brand.trim(),
      productName: formData.productName.trim(),
      productNameJp:
        formData.productNameJp.trim(),
      priceJpy: Number(formData.priceJpy),
      originalPriceJpy:
        formData.originalPriceJpy === ""
          ? null
          : Number(
              formData.originalPriceJpy
            ),
      stock: Number(formData.stock),
      thumbnailUrl:
        formData.thumbnailUrl.trim(),
      status: formData.status,
    };

    try {
      setIsSubmitting(true);

      await onRegister(registerData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (event) => {
    if (
      event.target === event.currentTarget
    ) {
      onClose();
    }
  };

  return (
    <div
      className="ap-modal-overlay"
      onMouseDown={handleOverlayClick}
    >
      <div
        className="ap-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-register-title"
      >
        <div className="ap-modal-header">
          <div>
            <h3 id="product-register-title">
              상품 등록
            </h3>

            <p>
              판매할 상품 정보를 입력하세요.
            </p>
          </div>

          <button
            type="button"
            className="ap-modal-close"
            onClick={onClose}
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        <form
          className="ap-modal-form"
          onSubmit={handleSubmit}
        >
          <div className="ap-modal-grid">
            <label>
              카테고리
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">
                  카테고리 선택
                </option>

                {categories.map((category) => (
                  <option
                    key={category.categoryId}
                    value={category.categoryId}
                  >
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </label>

            <label>
              판매 유형
              <select
                name="saleType"
                value={formData.saleType}
                onChange={handleChange}
              >
                <option value="OVERSEAS">
                  해외직구
                </option>

                <option value="GROUP_BUY">
                  공동구매
                </option>
              </select>
            </label>

            <label>
              브랜드
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="브랜드명"
              />
            </label>

            <label>
              판매 상태
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="ACTIVE">
                  판매 중
                </option>

                <option value="SOLD_OUT">
                  품절
                </option>

                <option value="HIDDEN">
                  판매 중지
                </option>
              </select>
            </label>

            <label className="ap-modal-full">
              상품명
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="상품명을 입력하세요."
                required
              />
            </label>

            <label className="ap-modal-full">
              일본어 상품명
              <input
                type="text"
                name="productNameJp"
                value={formData.productNameJp}
                onChange={handleChange}
                placeholder="日本語の商品名"
              />
            </label>

            <label>
              판매가격
              <input
                type="number"
                name="priceJpy"
                value={formData.priceJpy}
                onChange={handleChange}
                min="0"
                placeholder="0"
                required
              />
            </label>

            <label>
              원래 가격
              <input
                type="number"
                name="originalPriceJpy"
                value={
                  formData.originalPriceJpy
                }
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </label>

            <label>
              재고
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="0"
                required
              />
            </label>

            <label className="ap-modal-full">
              이미지 URL
              <input
                type="url"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </label>
          </div>

          <div className="ap-modal-actions">
            <button
              type="button"
              className="ap-modal-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              취소
            </button>

            <button
              type="submit"
              className="ap-modal-submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "등록 중..."
                : "상품 등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProductRegisterModal;