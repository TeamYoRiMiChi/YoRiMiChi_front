import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faGift } from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/MyPage/MyCoupons.css";
import useMyCoupons from "../../../hooks/MyPage/MyPage/useMyCoupons";

const STATUS_LABEL = {
  AVAILABLE: "利用可能",
  USED: "利用済み",
  EXPIRED: "期限切れ",
};

function formatDiscount(coupon) {
  return coupon.discountType === "PERCENT"
    ? `${coupon.discountValue}%OFF`
    : `¥${coupon.discountValue.toLocaleString()}OFF`;
}

function formatValidTo(validTo) {
  if (!validTo) return "-";

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(validTo));
}

function formatCondition(coupon) {
  return coupon.minOrderAmount > 0
    ? `¥${coupon.minOrderAmount.toLocaleString()}以上購入時`
    : "購入金額制限なし";
}

function MyCoupons() {
  const {
    myCoupons,
    claimableCoupons,
    isLoading,
    error,
    claimingId,
    claimError,
    handleClaim,
  } = useMyCoupons();

  return (
    <div className="mp_panel">
      {isLoading && (
        <p className="mc_status mc_status_loading">読み込み中です...</p>
      )}

      {!isLoading && error && (
        <p className="mc_status mc_status_error">{error}</p>
      )}

      {!isLoading && !error && (
        <>
          {claimableCoupons.length > 0 && (
            <section className="mc_section">
              <h3 className="mc_section_title">
                <FontAwesomeIcon icon={faGift} />
                受け取り可能なクーポン
              </h3>

              {claimError && (
                <p className="mc_status mc_status_error">{claimError}</p>
              )}

              <div className="mc_claim_list">
                {claimableCoupons.map((coupon) => (
                  <div className="mc_claim_card" key={coupon.couponId}>
                    <div className="mc_claim_discount">
                      {formatDiscount(coupon)}
                    </div>

                    <div className="mc_claim_info">
                      <strong>{coupon.couponName}</strong>
                      <span>
                        {formatCondition(coupon)} ・{" "}
                        {formatValidTo(coupon.validTo)}まで
                      </span>
                    </div>

                    <button
                      type="button"
                      className="mc_claim_button"
                      disabled={claimingId === coupon.couponId}
                      onClick={() => handleClaim(coupon.couponId)}
                    >
                      {claimingId === coupon.couponId
                        ? "受け取り中..."
                        : "受け取る"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mc_section">
            <h3 className="mc_section_title">
              <FontAwesomeIcon icon={faTicket} />
              保有クーポン
            </h3>

            {myCoupons.length === 0 ? (
              <p className="mc_empty">保有しているクーポンがありません。</p>
            ) : (
              <div className="mc_list">
                {myCoupons.map((coupon) => (
                  <div
                    className={`mc_card ${
                      coupon.status !== "AVAILABLE" ? "mc_card_disabled" : ""
                    }`}
                    key={coupon.memberCouponId}
                  >
                    <div className="mc_card_discount">
                      {formatDiscount(coupon)}
                    </div>

                    <div className="mc_card_info">
                      <strong>{coupon.couponName}</strong>
                      <span>
                        {formatCondition(coupon)} ・{" "}
                        {formatValidTo(coupon.validTo)}まで
                      </span>
                    </div>

                    <span
                      className={`mc_card_status mc_card_status_${coupon.status.toLowerCase()}`}
                    >
                      {STATUS_LABEL[coupon.status] ?? coupon.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default MyCoupons;
