import AdminUserSummary from "../../../components/Admin/UsersManagement/AdminUserSummary";
import AdminUserFilters from "../../../components/Admin/UsersManagement/AdminUserFilters";
import AdminUserTable from "../../../components/Admin/UsersManagement/AdminUserTable";
import AdminUserFooter from "../../../components/Admin/UsersManagement/AdminUserFooter";
import useAdminUsers from "../../../hooks/Admin/UsersManagement/useAdminUsers";

import "./AdminUsers.css";
import { useSelector } from "react-redux";

/* =========================
   임시 회원 데이터
   나중에 API 데이터로 교체
========================= */


function AdminMembers() {

  const currentMemberId = useSelector((state) => state.auth.user?.memberId);

  const {
    keyword,
    setKeyword,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    selectedIds,
    summary,
    filteredMembers,
    totalPages,
    pagedMembers,
    isAllSelected,
    handleSelectAll,
    handleSelectItem,
    handleReset,
    handleStatusChange,
    handleBulkStatusChange,
    handleDemoteAdmin,
  } = useAdminUsers(currentMemberId);



  /* =========================
     날짜 표시
  ========================= */

  const formatDate =
    (dateValue) => {

      if (!dateValue) {
        return "-";
      }


      return new Intl.DateTimeFormat(
        "ja-JP",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      ).format(
        new Date(dateValue)
      );
    };


  return (

    <div className="am-page">


      {/* =========================
          페이지 제목
      ========================= */}

      <header className="am-page-header">

        <div>

          <h2>
            회원 관리
          </h2>

          <p>
            가입 회원의 정보와
            이용 상태를 관리하세요.
          </p>

        </div>

      </header>



      {/* =========================
          현황 카드
      ========================= */}
      <AdminUserSummary summary={summary} />


      {/* =========================
          목록 패널
      ========================= */}

      <section className="am-panel">


        {/* 검색 / 필터 */}

        <AdminUserFilters
          keyword={keyword}
          roleFilter={roleFilter}
          statusFilter={statusFilter}
          onKeywordChange={(value) => {
            setKeyword(value);
            setPage(1);
          }}
          onRoleFilterChange={(value) => {
            setRoleFilter(value);
            setPage(1);
          }}
          onStatusFilterChange={(value) => {
            setStatusFilter(value);
            setPage(1);
          }}
          onReset={handleReset}
        />

        {/* =========================
            회원 테이블
        ========================= */}

        <AdminUserTable
          pagedMembers={pagedMembers}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          handleSelectAll={handleSelectAll}
          handleSelectItem={handleSelectItem}
          handleStatusChange={handleStatusChange}
          handleDemoteAdmin={handleDemoteAdmin}
          formatDate={formatDate}
          currentMemberId={currentMemberId}
        />

        {/* =========================
            테이블 하단
        ========================= */}

        <AdminUserFooter
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          handleSelectAll={handleSelectAll}
          handleBulkStatusChange={handleBulkStatusChange}
          filteredCount={filteredMembers.length}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />

      </section>


    </div>

  );
}


export default AdminMembers;
