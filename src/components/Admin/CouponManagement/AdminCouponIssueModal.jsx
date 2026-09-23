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
      setError("発行する会員のメールアドレスを1件以上入力してください。");
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
        err.response?.data?.message ?? "クーポンの発行に失敗しました。もう一度お試しください。"
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
            <h3 id="acp-issue-modal-title">クーポン発行</h3>
            <p>会員にこのクーポンを付与します。</p>
          </div>

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
          <div className="acp-modal-coupon-badge">
            <strong>{coupon.couponName}</strong>
            <span>{coupon.couponCode}</span>
          </div>

          <div className="acp-modal-field">
            <label>発行対象</label>

            <div className="acp-modal-target-box">
              <button
                type="button"
                className={`acp-modal-target-option ${
                  target === "SELECTED" ? "acp-modal-target-active" : ""
                }`}
                onClick={() => setTarget("SELECTED")}
              >
                選択した会員
              </button>

              <button
                type="button"
                className={`acp-modal-target-option ${
                  target === "ALL" ? "acp-modal-target-active" : ""
                }`}
                onClick={() => setTarget("ALL")}
              >
                全会員
              </button>
            </div>
          </div>

          {target === "SELECTED" && (
            <div className="acp-modal-field">
              <label htmlFor="emails">会員メールアドレス</label>

              <textarea
                id="emails"
                value={emailText}
                onChange={(event) => {
                  setEmailText(event.target.value);
                  setError(null);
                }}
                placeholder={"例)\njiyun@example.com\nminsu@example.com"}
              />

              <span className="acp-modal-hint">
                カンマまたは改行で複数人を区切って入力してください。
              </span>

              {error && <span className="acp-modal-error">{error}</span>}
            </div>
          )}

          {target === "ALL" && (
            <p className="acp-modal-hint">
              現在アクティブな全会員にこのクーポンが発行されます。
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
              キャンセル
            </button>

            <button
              type="submit"
              className="acp-modal-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "発行中..." : "発行"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCouponIssueModal;
