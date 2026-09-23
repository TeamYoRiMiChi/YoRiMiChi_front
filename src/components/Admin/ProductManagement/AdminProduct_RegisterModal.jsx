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

  // 공동구매 정보
  groupBuyTitle: "",
  groupBuyDescription: "",
  targetQuantity: "",
  startDate: "",
  endDate: "",
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
      alert("カテゴリを選択してください。");
      return;
    }

    if (!formData.productName.trim()) {
      alert("商品名を入力してください。");
      return;
    }

    if (
      formData.priceJpy === "" ||
      Number(formData.priceJpy) < 0
    ) {
      alert(
        "価格は0以上の数値を入力してください。"
      );
      return;
    }

    if (
      formData.stock === "" ||
      Number(formData.stock) < 0
    ) {
      alert(
        "在庫は0以上の数値を入力してください。"
      );
      return;
    }

    /*
     * 공동구매 상품 검사
     */
    if (
      formData.saleType === "GROUP_BUY"
    ) {
      if (
        !formData.groupBuyTitle.trim()
      ) {
        alert(
          "共同購入タイトルを入力してください。"
        );
        return;
      }

      if (
        formData.targetQuantity === "" ||
        Number(
          formData.targetQuantity
        ) < 1
      ) {
        alert(
          "目標数量は1個以上にしてください。"
        );
        return;
      }

      /*
       * 판매 중인 공동구매만
       * 모집 기간을 검사한다.
       */
      if (formData.status === "ACTIVE") {
        if (!formData.startDate) {
          alert(
            "募集開始日を入力してください。"
          );
          return;
        }

        if (!formData.endDate) {
          alert(
            "募集締切日を入力してください。"
          );
          return;
        }

        if (
          new Date(formData.endDate) <=
          new Date(formData.startDate)
        ) {
          alert(
            "募集締切日は開始日より後にしてください。"
          );
          return;
        }
      }
    }

    const isGroupBuy =
      formData.saleType === "GROUP_BUY";

    const isActiveGroupBuy =
      isGroupBuy &&
      formData.status === "ACTIVE";

    const registerData = {
      categoryId: Number(
        formData.categoryId
      ),

      saleType: formData.saleType,

      brand: formData.brand.trim(),

      productName:
        formData.productName.trim(),

      productNameJp:
        formData.productNameJp.trim(),

      priceJpy: Number(
        formData.priceJpy
      ),

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

      /*
       * 공동구매 상품일 때만 전송
       */
      groupBuyTitle:
        isGroupBuy
          ? formData.groupBuyTitle.trim()
          : null,

      groupBuyDescription:
        isGroupBuy
          ? formData
              .groupBuyDescription
              .trim()
          : null,

      targetQuantity:
        isGroupBuy
          ? Number(
              formData.targetQuantity
            )
          : null,

      /*
       * 판매 중인 공동구매일 때만
       * 모집 기간 전송
       */
      startDate:
        isActiveGroupBuy
          ? formData.startDate
          : null,

      endDate:
        isActiveGroupBuy
          ? formData.endDate
          : null,
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

  const isGroupBuy =
    formData.saleType === "GROUP_BUY";

  const isDateDisabled =
    formData.status !== "ACTIVE";

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
              商品登録
            </h3>

            <p>
              販売する商品情報を
              入力してください。
            </p>
          </div>

          <button
            type="button"
            className="ap-modal-close"
            onClick={onClose}
            aria-label="閉じる"
            disabled={isSubmitting}
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
              カテゴリ
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">
                  カテゴリを選択
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={
                        category.categoryId
                      }
                      value={
                        category.categoryId
                      }
                    >
                      {
                        category.categoryName
                      }
                    </option>
                  )
                )}
              </select>
            </label>

            <label>
              販売種別
              <select
                name="saleType"
                value={formData.saleType}
                onChange={handleChange}
              >
                <option value="OVERSEAS">
                  海外直購
                </option>

                <option value="GROUP_BUY">
                  共同購入
                </option>
              </select>
            </label>

            <label>
              ブランド
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="ブランド名"
              />
            </label>

            <label>
              販売ステータス
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="ACTIVE">
                  販売中
                </option>

                <option value="SOLD_OUT">
                  在庫切れ
                </option>

                <option value="HIDDEN">
                  販売停止
                </option>
              </select>
            </label>

            <label className="ap-modal-full">
              商品名
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="商品名を入力してください。"
                required
              />
            </label>

            <label className="ap-modal-full">
              日本語の商品名
              <input
                type="text"
                name="productNameJp"
                value={formData.productNameJp}
                onChange={handleChange}
                placeholder="日本語の商品名"
              />
            </label>

            <label>
              販売価格
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
              元の価格
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
              在庫
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
              画像URL
              <input
                type="url"
                name="thumbnailUrl"
                value={
                  formData.thumbnailUrl
                }
                onChange={handleChange}
                placeholder="https://..."
              />
            </label>

            {isGroupBuy && (
              <>
                <label className="ap-modal-full">
                  共同購入タイトル
                  <input
                    type="text"
                    name="groupBuyTitle"
                    value={
                      formData.groupBuyTitle
                    }
                    onChange={handleChange}
                    placeholder="共同購入タイトル"
                    required
                  />
                </label>

                <label className="ap-modal-full">
                  共同購入の説明
                  <textarea
                    name="groupBuyDescription"
                    value={
                      formData
                        .groupBuyDescription
                    }
                    onChange={handleChange}
                    placeholder="共同購入の説明"
                  />
                </label>

                <label>
                  目標数量
                  <input
                    type="number"
                    name="targetQuantity"
                    value={
                      formData.targetQuantity
                    }
                    onChange={handleChange}
                    min="1"
                    placeholder="100"
                    required
                  />
                </label>

                <label>
                  募集開始日
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={
                      formData.startDate
                    }
                    onChange={handleChange}
                    disabled={
                      isDateDisabled
                    }
                    required={
                      !isDateDisabled
                    }
                  />
                </label>

                <label>
                  募集締切日
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    disabled={
                      isDateDisabled
                    }
                    required={
                      !isDateDisabled
                    }
                  />
                </label>

                {isDateDisabled && (
                  <p className="ap-modal-full">
                    販売中の共同購入のみ
                    募集期間を設定できます。
                  </p>
                )}
              </>
            )}
          </div>

          <div className="ap-modal-actions">
            <button
              type="button"
              className="ap-modal-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              キャンセル
            </button>

            <button
              type="submit"
              className="ap-modal-submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "登録中..."
                : "商品登録"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProductRegisterModal;
