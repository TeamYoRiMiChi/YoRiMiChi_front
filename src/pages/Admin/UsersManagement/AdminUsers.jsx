import AdminUserSummary from "../../../components/Admin/UsersManagement/AdminUserSummary";
import AdminUserFilters from "../../../components/Admin/UsersManagement/AdminUserFilters";
import AdminUserTable from "../../../components/Admin/UsersManagement/AdminUserTable";
import AdminUserFooter from "../../../components/Admin/UsersManagement/AdminUserFooter";
import useAdminUsers from "../../../hooks/Admin/UsersManagement/useAdminUsers";

import "./AdminUsers.css";


/* =========================
   임시 회원 데이터
   나중에 API 데이터로 교체
========================= */


function AdminMembers() {

  const {
    setMembers,
    keyword,
    setKeyword,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    selectedIds,
    setSelectedIds,
    summary,
    filteredMembers,
  } = useAdminUsers();

  const pageSize = 8;


  /* =========================
     페이지네이션
  ========================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredMembers.length /
        pageSize
      )
    );


  const pagedMembers =
    filteredMembers.slice(
      (page - 1) * pageSize,
      page * pageSize
    );


  /* =========================
     전체 선택
  ========================= */

  const visibleIds =
    pagedMembers.map(
      (member) =>
        member.memberId
    );


  const isAllSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) =>
      selectedIds.includes(id)
    );


  const handleSelectAll = () => {

    if (isAllSelected) {

      setSelectedIds((current) =>
        current.filter(
          (id) =>
            !visibleIds.includes(id)
        )
      );

      return;
    }


    setSelectedIds((current) => [

      ...new Set([
        ...current,
        ...visibleIds,
      ]),

    ]);
  };


  const handleSelectItem =
    (memberId) => {

      setSelectedIds((current) => {

        if (
          current.includes(memberId)
        ) {

          return current.filter(
            (id) =>
              id !== memberId
          );
        }


        return [
          ...current,
          memberId,
        ];
      });
    };


  /* =========================
     필터 초기화
  ========================= */

  const handleReset = () => {

    setKeyword("");

    setRoleFilter("");

    setStatusFilter("");

    setPage(1);
  };


  /* =========================
     회원 상태 변경
  ========================= */

  const handleStatusChange =
    (memberId, nextStatus) => {

      setMembers((current) =>

        current.map((member) => {

          if (
            member.memberId !==
            memberId
          ) {
            return member;
          }


          return {

            ...member,

            status: nextStatus,

            withdrawnAt:
              nextStatus ===
                "WITHDRAWN"
                ? new Date()
                  .toISOString()
                : null,
          };
        })
      );
    };


  /* =========================
     선택 회원 상태 변경
  ========================= */

  const handleBulkStatusChange =
    (event) => {

      const nextStatus =
        event.target.value;


      if (
        !nextStatus ||
        selectedIds.length === 0
      ) {
        return;
      }


      setMembers((current) =>

        current.map((member) => {

          if (
            !selectedIds.includes(
              member.memberId
            )
          ) {
            return member;
          }


          return {

            ...member,

            status: nextStatus,

            withdrawnAt:
              nextStatus ===
                "WITHDRAWN"
                ? new Date()
                  .toISOString()
                : null,
          };
        })
      );


      setSelectedIds([]);

      event.target.value = "";
    };


  /* =========================
     날짜 표시
  ========================= */

  const formatDate =
    (dateValue) => {

      if (!dateValue) {
        return "-";
      }


      return new Intl.DateTimeFormat(
        "ko-KR",
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
          formatDate={formatDate}
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
