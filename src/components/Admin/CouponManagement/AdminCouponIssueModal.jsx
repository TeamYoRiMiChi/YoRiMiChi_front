import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { issueAdminCoupon } from "../../../api/Admin/CouponManagement/adminCouponApi";

import "../../../assets/styles/Admin/CouponManagement/components/AdminCouponModal.css";


function parseEmails(text) {
  return text
    .split(/[\n,]/)
    .map((email) => email.trim())
    .filter((email) => email.length > 0);
}


function AdminCouponIssueModal({ coupon, onClose, onIssued }) {
  const [target, setTarget] = useState("SELECTED"); // SELECTED | ALL
  const [emailText, setEmailText] = useState("");
  const [error, setError] = useState(null);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emails = parseEmails(emailText);

    if (target === "SELECTED" && emails.length === 0) {
      setError("발급할 회원의 이메일을 한 명 이상 입력해주세요.");
      return;
    }

    setError(null);
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await issueAdminCoupon(coupon.couponId, {
        issueToAll: target === "ALL",
        emails,
      });

      onIssued();
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ?? "쿠폰 발급에 실패했습니다. 다시 시도해주세요."
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
        aria-labelledby="acp-issue-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="acp-modal-header">
          <div>
            <h3 id="acp-issue-modal-title">쿠폰 발급</h3>
            <p>회원에게 이 쿠폰을 지급합니다.</p>
          </div>

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
          <div className="acp-modal-coupon-badge">
            <strong>{coupon.couponName}</strong>
            <span>{coupon.couponCode}</span>
          </div>

          <div className="acp-modal-field">
            <label>발급 대상</label>

            <div className="acp-modal-target-box">
              <button
                type="button"
                className={`acp-modal-target-option ${
                  target === "SELECTED" ? "acp-modal-target-active" : ""
                }`}
                onClick={() => setTarget("SELECTED")}
              >
                선택한 회원
              </button>

              <button
                type="button"
                className={`acp-modal-target-option ${
                  target === "ALL" ? "acp-modal-target-active" : ""
                }`}
                onClick={() => setTarget("ALL")}
              >
                전체 회원
              </button>
            </div>
          </div>

          {target === "SELECTED" && (
            <div className="acp-modal-field">
              <label htmlFor="emails">회원 이메일</label>

              <textarea
                id="emails"
                value={emailText}
                onChange={(event) => {
                  setEmailText(event.target.value);
                  setError(null);
                }}
                placeholder={"예)\njiyun@example.com\nminsu@example.com"}
              />

              <span className="acp-modal-hint">
                쉼표 또는 줄바꿈으로 여러 명을 구분해서 입력하세요.
              </span>

              {error && <span className="acp-modal-error">{error}</span>}
            </div>
          )}

          {target === "ALL" && (
            <p className="acp-modal-hint">
              현재 활동 중인 전체 회원에게 이 쿠폰이 발급됩니다.
            </p>
          )}

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
              {isSubmitting ? "발급 중..." : "발급"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCouponIssueModal;
