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
    errors.couponCode = "쿠폰 코드를 입력해주세요.";
  }

  if (!form.couponName.trim()) {
    errors.couponName = "쿠폰명을 입력해주세요.";
  }

  if (!form.discountValue || Number(form.discountValue) <= 0) {
    errors.discountValue = "0보다 큰 값을 입력해주세요.";
  }

  if (
    form.discountType === "PERCENT" &&
    Number(form.discountValue) > 100
  ) {
    errors.discountValue = "정률 할인은 100 이하로 입력해주세요.";
  }

  if (!form.usageLimit || Number(form.usageLimit) <= 0) {
    errors.usageLimit = "0보다 큰 값을 입력해주세요.";
  }

  if (!form.validFrom) {
    errors.validFrom = "시작일을 선택해주세요.";
  }

  if (!form.validTo) {
    errors.validTo = "종료일을 선택해주세요.";
  }

  if (
    form.validFrom &&
    form.validTo &&
    form.validFrom > form.validTo
  ) {
    errors.validTo = "종료일은 시작일 이후여야 합니다.";
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
        err.response?.data?.message ?? "쿠폰 등록에 실패했습니다. 다시 시도해주세요."
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
          <h3 id="acp-create-modal-title">쿠폰 등록</h3>

          <button
            type="button"
            className="acp-modal-close"
            onClick={onClose}
            aria-label="닫기"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <form className="acp-modal-body" onSubmit={handleSubmit}>
          <div className="acp-modal-row">
            <div className="acp-modal-field">
              <label htmlFor="couponCode">쿠폰 코드</label>

              <input
                id="couponCode"
                name="couponCode"
                type="text"
                value={form.couponCode}
                onChange={handleChange}
                placeholder="예) WELCOME10"
              />

              {errors.couponCode && (
                <span className="acp-modal-error">{errors.couponCode}</span>
              )}
            </div>

            <div className="acp-modal-field">
              <label htmlFor="couponName">쿠폰명</label>

              <input
                id="couponName"
                name="couponName"
                type="text"
                value={form.couponName}
                onChange={handleChange}
                placeholder="예) 신규회원 10% 할인"
              />

              {errors.couponName && (
                <span className="acp-modal-error">{errors.couponName}</span>
              )}
            </div>
          </div>

          <div className="acp-modal-row">
            <div className="acp-modal-field">
              <label htmlFor="discountType">할인 방식</label>

              <select
                id="discountType"
                name="discountType"
                value={form.discountType}
                onChange={handleChange}
              >
                <option value="PERCENT">정률 할인 (%)</option>
                <option value="FIXED">정액 할인 (원)</option>
              </select>
            </div>

            <div className="acp-modal-field">
              <label htmlFor="discountValue">
                할인 {form.discountType === "PERCENT" ? "율 (%)" : "금액 (원)"}
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
              <label htmlFor="minOrderAmount">최소 주문금액 (원)</label>

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
              <label htmlFor="maxDiscountAmount">최대 할인금액 (원)</label>

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
              <label htmlFor="issueType">발급 방식</label>

              <select
                id="issueType"
                name="issueType"
                value={form.issueType}
                onChange={handleChange}
              >
                <option value="ALL">전체 발급형 (누구나 발급 가능)</option>
                <option value="TARGET">대상 지정형 (관리자가 지정 발급)</option>
              </select>
            </div>

            <div className="acp-modal-field">
              <label htmlFor="usageLimit">발급 한도</label>

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
              <label htmlFor="validFrom">시작일</label>

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
              <label htmlFor="validTo">종료일</label>

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
              취소
            </button>

            <button
              type="submit"
              className="acp-modal-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "등록 중..." : "등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCouponCreateModal;
