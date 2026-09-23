//컴포넌트,훅나누기 완료. 백엔드 연결 완료(관리자 쿠폰 패키지 구현되면 동작)
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AdminCouponSummary from "../../../components/Admin/CouponManagement/AdminCouponSummary";
import AdminCouponTabs from "../../../components/Admin/CouponManagement/AdminCouponTabs";
import AdminCouponFilter from "../../../components/Admin/CouponManagement/AdminCouponFilter";
import AdminCouponTable from "../../../components/Admin/CouponManagement/AdminCouponTable";
import AdminMemberCouponFilter from "../../../components/Admin/CouponManagement/AdminMemberCouponFilter";
import AdminMemberCouponTable from "../../../components/Admin/CouponManagement/AdminMemberCouponTable";
import AdminCouponPagination from "../../../components/Admin/CouponManagement/AdminCouponPagination";
import AdminCouponCreateModal from "../../../components/Admin/CouponManagement/AdminCouponCreateModal";
import AdminCouponIssueModal from "../../../components/Admin/CouponManagement/AdminCouponIssueModal";

import useCouponFilter from "../../../hooks/Admin/CouponManagement/useCouponFilter";
import useMemberCouponFilter from "../../../hooks/Admin/CouponManagement/useMemberCouponFilter";
import useCouponSummary from "../../../hooks/Admin/CouponManagement/useCouponSummary";

import { stopAdminCoupon } from "../../../api/Admin/CouponManagement/adminCouponApi";

import "../../../assets/styles/Admin/CouponManagement/AdminCoupons.css";


function AdminCoupons() {
  const [activeTab, setActiveTab] = useState("COUPON");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [issuingCoupon, setIssuingCoupon] = useState(null);

  const {
    couponKeyword,
    discountType,
    couponStatus,
    couponPage,
    pagedCoupons,
    totalCount: couponTotalCount,
    couponTotalPages,
    isLoading: isCouponLoading,
    error: couponError,
    refetchCoupons,
    handleCouponKeywordChange,
    handleDiscountTypeChange,
    handleCouponStatusChange,
    handleCouponPageChange,
    handleCouponReset,
  } = useCouponFilter();

  const {
    memberCouponKeyword,
    memberCouponStatus,
    memberCouponPage,
    pagedMemberCoupons,
    memberCouponTotalCount,
    memberCouponTotalPages,
    isLoading: isMemberCouponLoading,
    error: memberCouponError,
    refetchMemberCoupons,
    handleMemberCouponKeywordChange,
    handleMemberCouponStatusChange,
    handleMemberCouponPageChange,
    handleMemberCouponReset,
  } = useMemberCouponFilter();

  const { summary, refetchSummary } = useCouponSummary();

  const handleCouponCreated = () => {
    setIsCreateModalOpen(false);
    handleCouponPageChange(1);
    refetchCoupons();
    refetchSummary();
  };

  const handleCouponIssued = () => {
    setIssuingCoupon(null);
    refetchCoupons();
    refetchMemberCoupons();
    refetchSummary();
  };

  const handleStopCoupon = async (coupon) => {
    const confirmed = window.confirm(
      `「${coupon.couponName}」クーポンを停止しますか？\n停止すると新規発行はできなくなりますが、すでに発行された分はそのまま利用できます。`
    );

    if (!confirmed) {
      return;
    }

    try {
      await stopAdminCoupon(coupon.couponId);
      refetchCoupons();
      refetchSummary();
    } catch (err) {
      window.alert(
        err.response?.data?.message ?? "クーポンの停止に失敗しました。もう一度お試しください。"
      );
    }
  };


  return (
    <div className="acp-page">

      {/* =========================
          HEADER
      ========================= */}

      <header className="acp-page-header">
        <div>
          <h2>クーポン管理</h2>

          <p>
            クーポン情報と会員別の
            クーポン発行履歴を管理します。
          </p>
        </div>

        {activeTab === "COUPON" && (
          <button
            type="button"
            className="acp-create-button"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
            クーポン登録
          </button>
        )}
      </header>


      {/* =========================
          SUMMARY
      ========================= */}

      <AdminCouponSummary summary={summary} />


      {/* =========================
          TAB
      ========================= */}

      <AdminCouponTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />


      {/* =========================
          COUPON TAB
      ========================= */}

      {activeTab === "COUPON" && (
        <section className="acp-panel">
          <AdminCouponFilter
            couponKeyword={couponKeyword}
            discountType={discountType}
            couponStatus={couponStatus}
            onKeywordChange={handleCouponKeywordChange}
            onDiscountTypeChange={handleDiscountTypeChange}
            onStatusChange={handleCouponStatusChange}
            onReset={handleCouponReset}
          />

          {isCouponLoading && (
            <p className="acp-status-message acp-status-loading">
              クーポン一覧を読み込んでいます...
            </p>
          )}

          {!isCouponLoading && couponError && (
            <p className="acp-status-message acp-status-error">
              {couponError}
            </p>
          )}

          <AdminCouponTable
            coupons={pagedCoupons}
            onIssueClick={setIssuingCoupon}
            onStopClick={handleStopCoupon}
          />

          <AdminCouponPagination
            totalCount={couponTotalCount}
            totalLabel="件のクーポン"
            page={couponPage}
            totalPages={couponTotalPages}
            onPageChange={handleCouponPageChange}
          />
        </section>
      )}


      {/* =========================
          MEMBER_COUPON TAB
      ========================= */}

      {activeTab === "MEMBER_COUPON" && (
        <section className="acp-panel">
          <AdminMemberCouponFilter
            memberCouponKeyword={memberCouponKeyword}
            memberCouponStatus={memberCouponStatus}
            onKeywordChange={handleMemberCouponKeywordChange}
            onStatusChange={handleMemberCouponStatusChange}
            onReset={handleMemberCouponReset}
          />

          {isMemberCouponLoading && (
            <p className="acp-status-message acp-status-loading">
              発行履歴を読み込んでいます...
            </p>
          )}

          {!isMemberCouponLoading && memberCouponError && (
            <p className="acp-status-message acp-status-error">
              {memberCouponError}
            </p>
          )}

          <AdminMemberCouponTable memberCoupons={pagedMemberCoupons} />

          <AdminCouponPagination
            totalCount={memberCouponTotalCount}
            totalLabel="件の発行履歴"
            page={memberCouponPage}
            totalPages={memberCouponTotalPages}
            onPageChange={handleMemberCouponPageChange}
          />
        </section>
      )}


      {/* =========================
          쿠폰 등록 모달
      ========================= */}

      {isCreateModalOpen && (
        <AdminCouponCreateModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreated={handleCouponCreated}
        />
      )}

      {issuingCoupon && (
        <AdminCouponIssueModal
          coupon={issuingCoupon}
          onClose={() => setIssuingCoupon(null)}
          onIssued={handleCouponIssued}
        />
      )}

    </div>
  );
}

export default AdminCoupons;
