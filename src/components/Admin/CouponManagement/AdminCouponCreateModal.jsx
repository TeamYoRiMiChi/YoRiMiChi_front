import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { createAdminCoupon } from "../../../api/Admin/CouponManagement/adminCouponApi";

import "../../../assets/styles/Admin/CouponManagement/components/AdminCouponModal.css";


const INITIAL_FORM = {
  couponCode: "",
  couponName: "",
  discountType: "PERCENT",
  discountValue: "",
  minOrderAmount: "",
  maxDiscountAmount: "",
  issueType: "ALL",
  validFrom: "",
  validTo: "",
  usageLimit: "",
};


function validate(form) {
  const errors = {};

  if (!form.couponCode.trim()) {
    errors.couponCode = "クーポンコードを入力してください。";
  }

  if (!form.couponName.trim()) {
    errors.couponName = "クーポン名を入力してください。";
  }

  if (!form.discountValue || Number(form.discountValue) <= 0) {
    errors.discountValue = "0より大きい値を入力してください。";
  }

  if (
    form.discountType === "PERCENT" &&
    Number(form.discountValue) > 100
  ) {
    errors.discountValue = "定率割引は100以下で入力してください。";
  }

  if (!form.usageLimit || Number(form.usageLimit) <= 0) {
    errors.usageLimit = "0より大きい値を入力してください。";
  }

  if (!form.validFrom) {
    errors.validFrom = "開始日を選択してください。";
  }

  if (!form.validTo) {
    errors.validTo = "終了日を選択してください。";
  }

  if (
    form.validFrom &&
    form.validTo &&
    form.validFrom > form.validTo
  ) {
    errors.validTo = "終了日は開始日より後にしてください。";
  }

  return errors;
}


function AdminCouponCreateModal({ onClose, onCreated }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  /* ESC 키로 닫기 */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await createAdminCoupon({
        ...form,
        validFrom: `${form.validFrom}T00:00:00`,
        validTo: `${form.validTo}T23:59:59`,
      });

      onCreated();
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ?? "クーポンの登録に失敗しました。もう一度お試しください。"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="acp-modal-overlay" onClick={onClose}>
      <div
        className="acp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="acp-create-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="acp-modal-header">
          <h3 id="acp-create-modal-title">クーポン登録</h3>

          <button
            type="button"
            className="acp-modal-close"
            onClick={onClose}
            aria-label="閉じる"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <form className="acp-modal-body" onSubmit={handleSubmit}>
          <div className="acp-modal-row">
            <div className="acp-modal-field">
              <label htmlFor="couponCode">クーポンコード</label>

              <input
                id="couponCode"
                name="couponCode"
                type="text"
                value={form.couponCode}
                onChange={handleChange}
                placeholder="例) WELCOME10"
              />

              {errors.couponCode && (
                <span className="acp-modal-error">{errors.couponCode}</span>
              )}
            </div>

            <div className="acp-modal-field">
              <label htmlFor="couponName">クーポン名</label>

              <input
                id="couponName"
                name="couponName"
                type="text"
                value={form.couponName}
                onChange={handleChange}
                placeholder="例) 新規会員10%割引"
              />

              {errors.couponName && (
                <span className="acp-modal-error">{errors.couponName}</span>
              )}
            </div>
          </div>

          <div className="acp-modal-row">
            <div className="acp-modal-field">
              <label htmlFor="discountType">割引方式</label>

              <select
                id="discountType"
                name="discountType"
                value={form.discountType}
                onChange={handleChange}
              >
                <option value="PERCENT">定率割引 (%)</option>
                <option value="FIXED">定額割引 (円)</option>
              </select>
            </div>

            <div className="acp-modal-field">
              <label htmlFor="discountValue">
                割引{form.discountType === "PERCENT" ? "率 (%)" : "金額 (円)"}
              </label>

              <input
                id="discountValue"
                name="discountValue"
                type="number"
                min="0"
                value={form.discountValue}
                onChange={handleChange}
              />

              {errors.discountValue && (
                <span className="acp-modal-error">
                  {errors.discountValue}
                </span>
              )}
            </div>
          </div>

          <div className="acp-modal-row">
            <div className="acp-modal-field">
              <label htmlFor="minOrderAmount">最低注文金額 (円)</label>

              <input
                id="minOrderAmount"
                name="minOrderAmount"
                type="number"
                min="0"
                value={form.minOrderAmount}
                onChange={handleChange}
              />
            </div>

            <div className="acp-modal-field">
              <label htmlFor="maxDiscountAmount">最大割引金額 (円)</label>

              <input
                id="maxDiscountAmount"
                name="maxDiscountAmount"
                type="number"
                min="0"
                value={form.maxDiscountAmount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="acp-modal-row">
            <div className="acp-modal-field">
              <label htmlFor="issueType">発行方式</label>

              <select
                id="issueType"
                name="issueType"
                value={form.issueType}
                onChange={handleChange}
              >
                <option value="ALL">全体発行型 (誰でも取得可能)</option>
                <option value="TARGET">対象指定型 (管理者が指定して発行)</option>
              </select>
            </div>

            <div className="acp-modal-field">
              <label htmlFor="usageLimit">発行上限</label>

              <input
                id="usageLimit"
                name="usageLimit"
                type="number"
                min="0"
                value={form.usageLimit}
                onChange={handleChange}
              />

              {errors.usageLimit && (
                <span className="acp-modal-error">{errors.usageLimit}</span>
              )}
            </div>
          </div>

          <div className="acp-modal-row">
            <div className="acp-modal-field">
              <label htmlFor="validFrom">開始日</label>

              <input
                id="validFrom"
                name="validFrom"
                type="date"
                value={form.validFrom}
                onChange={handleChange}
              />

              {errors.validFrom && (
                <span className="acp-modal-error">{errors.validFrom}</span>
              )}
            </div>

            <div className="acp-modal-field">
              <label htmlFor="validTo">終了日</label>

              <input
                id="validTo"
                name="validTo"
                type="date"
                value={form.validTo}
                onChange={handleChange}
              />

              {errors.validTo && (
                <span className="acp-modal-error">{errors.validTo}</span>
              )}
            </div>
          </div>

          {submitError && (
            <p className="acp-modal-submit-error">{submitError}</p>
          )}

          <div className="acp-modal-footer">
            <button
              type="button"
              className="acp-modal-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              キャンセル
            </button>

            <button
              type="submit"
              className="acp-modal-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "登録中..." : "登録"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCouponCreateModal;
