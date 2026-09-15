import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBan,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
  faRotateRight,
  faShieldHalved,
  faUser,
  faUserCheck,
  faUserGroup,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";

import "./AdminUsers.css";


/* =========================
   임시 회원 데이터
   나중에 API 데이터로 교체
========================= */

const initialMembers = [
  {
    memberId: 1,
    email: "jiyun@example.com",
    name: "안지윤",
    phone: "010-1234-5678",
    personalCustomsCode: "P123456789012",
    role: "USER",
    status: "ACTIVE",
    withdrawnAt: null,
  },
  {
    memberId: 2,
    email: "minsu@example.com",
    name: "김민수",
    phone: "010-2345-6789",
    personalCustomsCode: "P234567890123",
    role: "USER",
    status: "ACTIVE",
    withdrawnAt: null,
  },
  {
    memberId: 3,
    email: "sora@example.com",
    name: "이소라",
    phone: "010-3456-7890",
    personalCustomsCode: "P345678901234",
    role: "USER",
    status: "WITHDRAWN",
    withdrawnAt: "2026-08-29T14:30:00",
  },
  {
    memberId: 4,
    email: "admin@yorimichi.com",
    name: "관리자",
    phone: "010-1111-2222",
    personalCustomsCode: null,
    role: "ADMIN",
    status: "ACTIVE",
    withdrawnAt: null,
  },
  {
    memberId: 5,
    email: "yuna@example.com",
    name: "박유나",
    phone: "010-4567-8901",
    personalCustomsCode: "P456789012345",
    role: "USER",
    status: "ACTIVE",
    withdrawnAt: null,
  },
  {
    memberId: 6,
    email: "junho@example.com",
    name: "이준호",
    phone: "010-5678-9012",
    personalCustomsCode: "P567890123456",
    role: "USER",
    status: "WITHDRAWN",
    withdrawnAt: "2026-09-03T11:20:00",
  },
];


function AdminMembers() {

  const [members, setMembers] =
    useState(initialMembers);

  const [keyword, setKeyword] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [selectedIds, setSelectedIds] =
    useState([]);


  const pageSize = 8;


  /* =========================
     회원 현황
  ========================= */

  const summary = useMemo(() => {

    return {
      total: members.length,

      active: members.filter(
        (member) =>
          member.status === "ACTIVE"
      ).length,

      withdrawn: members.filter(
        (member) =>
          member.status === "WITHDRAWN"
      ).length,

      admin: members.filter(
        (member) =>
          member.role === "ADMIN"
      ).length,
    };

  }, [members]);


  /* =========================
     검색 / 필터
  ========================= */

  const filteredMembers = useMemo(() => {

    const normalizedKeyword =
      keyword.trim().toLowerCase();


    return members.filter((member) => {

      const keywordMatches =
        !normalizedKeyword ||

        member.name
          .toLowerCase()
          .includes(normalizedKeyword) ||

        member.email
          .toLowerCase()
          .includes(normalizedKeyword) ||

        member.phone
          .toLowerCase()
          .includes(normalizedKeyword) ||

        String(member.memberId)
          .includes(normalizedKeyword);


      const roleMatches =
        !roleFilter ||
        member.role === roleFilter;


      const statusMatches =
        !statusFilter ||
        member.status === statusFilter;


      return (
        keywordMatches &&
        roleMatches &&
        statusMatches
      );
    });

  }, [
    members,
    keyword,
    roleFilter,
    statusFilter,
  ]);


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

      <section className="am-summary-grid">


        <div className="am-summary-card">

          <div className="am-summary-icon am-summary-blue">

            <FontAwesomeIcon
              icon={faUserGroup}
            />

          </div>


          <div>

            <span>
              전체 회원
            </span>

            <strong>
              {summary.total}
            </strong>

          </div>

        </div>



        <div className="am-summary-card">

          <div className="am-summary-icon am-summary-green">

            <FontAwesomeIcon
              icon={faUserCheck}
            />

          </div>


          <div>

            <span>
              정상 회원
            </span>

            <strong>
              {summary.active}
            </strong>

          </div>

        </div>



        <div className="am-summary-card">

          <div className="am-summary-icon am-summary-red">

            <FontAwesomeIcon
              icon={faUserXmark}
            />

          </div>


          <div>

            <span>
              탈퇴 회원
            </span>

            <strong>
              {summary.withdrawn}
            </strong>

          </div>

        </div>



        <div className="am-summary-card">

          <div className="am-summary-icon am-summary-orange">

            <FontAwesomeIcon
              icon={faShieldHalved}
            />

          </div>


          <div>

            <span>
              관리자
            </span>

            <strong>
              {summary.admin}
            </strong>

          </div>

        </div>


      </section>



      {/* =========================
          목록 패널
      ========================= */}

      <section className="am-panel">


        {/* 검색 / 필터 */}

        <div className="am-filter-bar">


          <label className="am-search-box">

            <FontAwesomeIcon
              icon={faMagnifyingGlass}
            />


            <input
              type="search"
              value={keyword}
              placeholder="회원명, 이메일, 전화번호 또는 회원 ID 검색"
              onChange={(event) => {

                setKeyword(
                  event.target.value
                );

                setPage(1);
              }}
            />

          </label>



          <div className="am-filter-item">

            <span>
              권한
            </span>


            <select
              value={roleFilter}
              onChange={(event) => {

                setRoleFilter(
                  event.target.value
                );

                setPage(1);
              }}
            >

              <option value="">
                전체
              </option>

              <option value="USER">
                일반 회원
              </option>

              <option value="ADMIN">
                관리자
              </option>

            </select>

          </div>



          <div className="am-filter-item">

            <span>
              회원 상태
            </span>


            <select
              value={statusFilter}
              onChange={(event) => {

                setStatusFilter(
                  event.target.value
                );

                setPage(1);
              }}
            >

              <option value="">
                전체
              </option>

              <option value="ACTIVE">
                정상
              </option>

              <option value="WITHDRAWN">
                탈퇴
              </option>

            </select>

          </div>



          <button
            className="am-reset-button"
            type="button"
            onClick={handleReset}
          >

            <FontAwesomeIcon
              icon={faRotateRight}
            />

            초기화

          </button>


        </div>



        {/* =========================
            회원 테이블
        ========================= */}

        <div className="am-table-scroll">

          <table className="am-table">


            <thead>

              <tr>

                <th className="am-checkbox-cell">

                  <input
                    type="checkbox"
                    checked={
                      isAllSelected
                    }
                    onChange={
                      handleSelectAll
                    }
                  />

                </th>


                <th>
                  회원 정보
                </th>

                <th>
                  회원 ID
                </th>

                <th>
                  전화번호
                </th>

                <th>
                  개인통관고유부호
                </th>

                <th>
                  권한
                </th>

                <th>
                  회원 상태
                </th>

                <th>
                  탈퇴일
                </th>

                <th>
                  관리
                </th>

              </tr>

            </thead>



            <tbody>


              {pagedMembers.map(
                (member) => (

                  <tr
                    key={
                      member.memberId
                    }
                  >


                    <td className="am-checkbox-cell">

                      <input
                        type="checkbox"
                        checked={
                          selectedIds.includes(
                            member.memberId
                          )
                        }
                        onChange={() =>
                          handleSelectItem(
                            member.memberId
                          )
                        }
                      />

                    </td>



                    {/* 회원 정보 */}

                    <td>

                      <div className="am-member-info">


                        <div className="am-avatar">

                          <FontAwesomeIcon
                            icon={faUser}
                          />

                        </div>


                        <div>

                          <strong>
                            {member.name}
                          </strong>

                          <span>
                            {member.email}
                          </span>

                        </div>


                      </div>

                    </td>



                    <td>

                      <strong className="am-member-id">

                        {member.memberId}

                      </strong>

                    </td>



                    <td>

                      <span className="am-phone">

                        {member.phone}

                      </span>

                    </td>



                    <td>

                      <span className="am-customs-code">

                        {member.personalCustomsCode ||
                          "-"}

                      </span>

                    </td>



                    {/* 권한 */}

                    <td>

                      <span
                        className={
                          member.role ===
                          "ADMIN"
                            ? "am-role-badge am-role-admin"
                            : "am-role-badge am-role-user"
                        }
                      >

                        {member.role ===
                        "ADMIN"
                          ? "관리자"
                          : "일반 회원"}

                      </span>

                    </td>



                    {/* 상태 */}

                    <td>

                      <span
                        className={
                          member.status ===
                          "ACTIVE"
                            ? "am-status-badge am-status-active"
                            : "am-status-badge am-status-withdrawn"
                        }
                      >

                        {member.status ===
                        "ACTIVE"
                          ? "정상"
                          : "탈퇴"}

                      </span>

                    </td>



                    {/* 탈퇴일 */}

                    <td>

                      <span className="am-date">

                        {formatDate(
                          member.withdrawnAt
                        )}

                      </span>

                    </td>



                    {/* 관리 */}

                    <td>

                      {member.status ===
                      "ACTIVE" ? (

                        <button
                          type="button"
                          className="am-withdraw-button"
                          onClick={() =>
                            handleStatusChange(
                              member.memberId,
                              "WITHDRAWN"
                            )
                          }
                        >

                          <FontAwesomeIcon
                            icon={faBan}
                          />

                          탈퇴 처리

                        </button>

                      ) : (

                        <button
                          type="button"
                          className="am-restore-button"
                          onClick={() =>
                            handleStatusChange(
                              member.memberId,
                              "ACTIVE"
                            )
                          }
                        >

                          <FontAwesomeIcon
                            icon={faRotateRight}
                          />

                          복구

                        </button>

                      )}

                    </td>


                  </tr>

                )
              )}



              {pagedMembers.length ===
                0 && (

                <tr>

                  <td
                    colSpan={9}
                    className="am-empty"
                  >

                    조건에 맞는
                    회원이 없습니다.

                  </td>

                </tr>

              )}


            </tbody>


          </table>

        </div>



        {/* =========================
            테이블 하단
        ========================= */}

        <footer className="am-table-footer">


          <div className="am-bulk-actions">


            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={
                handleSelectAll
              }
            />


            <select
              defaultValue=""
              disabled={
                selectedIds.length === 0
              }
              onChange={
                handleBulkStatusChange
              }
            >

              <option
                value=""
                disabled
              >
                선택 상태 변경
              </option>

              <option value="ACTIVE">
                정상
              </option>

              <option value="WITHDRAWN">
                탈퇴
              </option>

            </select>


            <span>

              총{" "}

              <strong>
                {
                  filteredMembers.length
                }
              </strong>

              명의 회원

            </span>


          </div>



          {/* 페이지네이션 */}

          <div className="am-pagination">


            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage(
                  (current) =>
                    Math.max(
                      1,
                      current - 1
                    )
                )
              }
            >

              <FontAwesomeIcon
                icon={faChevronLeft}
              />

            </button>



            {Array.from(
              {
                length:
                  totalPages,
              },
              (_, index) =>
                index + 1
            ).map(
              (pageNumber) => (

                <button
                  key={pageNumber}
                  type="button"
                  className={
                    page ===
                    pageNumber
                      ? "am-page-active"
                      : ""
                  }
                  onClick={() =>
                    setPage(
                      pageNumber
                    )
                  }
                >

                  {pageNumber}

                </button>

              )
            )}



            <button
              type="button"
              disabled={
                page ===
                totalPages
              }
              onClick={() =>
                setPage(
                  (current) =>
                    Math.min(
                      totalPages,
                      current + 1
                    )
                )
              }
            >

              <FontAwesomeIcon
                icon={faChevronRight}
              />

            </button>


          </div>


        </footer>


      </section>


    </div>

  );
}


export default AdminMembers;
