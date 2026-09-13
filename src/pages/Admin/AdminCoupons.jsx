import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
  faPlus,
  faRotateRight,
  faTicket,
  faUsers,
  faClock,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import "./AdminCoupons.css";


/* =========================
   COUPON
   ERD 기준
========================= */

const initialCoupons = [
  {
    couponId: 1,
    couponCode: "WELCOME10",
    couponName: "신규회원 10% 할인",
    discountType: "PERCENT",
    discountValue: 10,
    minOrderAmount: 30000,
    maxDiscountAmount: 10000,
    issueType: "AUTO",
    validFrom: "2026-09-01T00:00:00",
    validTo: "2026-09-30T23:59:59",
    usageLimit: 1000,
    issuedCount: 328,
    status: "ACTIVE",
  },
  {
    couponId: 2,
    couponCode: "SEPT5000",
    couponName: "9월 5천원 할인",
    discountType: "FIXED",
    discountValue: 5000,
    minOrderAmount: 50000,
    maxDiscountAmount: 5000,
    issueType: "MANUAL",
    validFrom: "2026-09-01T00:00:00",
    validTo: "2026-09-30T23:59:59",
    usageLimit: 500,
    issuedCount: 194,
    status: "ACTIVE",
  },
  {
    couponId: 3,
    couponCode: "GROUPBUY15",
    couponName: "공동구매 15% 할인",
    discountType: "PERCENT",
    discountValue: 15,
    minOrderAmount: 40000,
    maxDiscountAmount: 15000,
    issueType: "EVENT",
    validFrom: "2026-08-01T00:00:00",
    validTo: "2026-08-31T23:59:59",
    usageLimit: 300,
    issuedCount: 300,
    status: "EXPIRED",
  },
  {
    couponId: 4,
    couponCode: "FIRST3000",
    couponName: "첫 주문 3천원 할인",
    discountType: "FIXED",
    discountValue: 3000,
    minOrderAmount: 20000,
    maxDiscountAmount: 3000,
    issueType: "AUTO",
    validFrom: "2026-09-01T00:00:00",
    validTo: "2026-10-31T23:59:59",
    usageLimit: 1500,
    issuedCount: 612,
    status: "ACTIVE",
  },
];


/* =========================
   MEMBER_COUPON
   ERD 기준
========================= */

const initialMemberCoupons = [
  {
    memberCouponId: 1001,
    couponId: 1,
    memberId: 11,
    orderId: null,
    issuedAt: "2026-09-01T12:00:00",
    usedAt: null,
    status: "ISSUED",
  },
  {
    memberCouponId: 1002,
    couponId: 2,
    memberId: 12,
    orderId: 505,
    issuedAt: "2026-09-03T15:20:00",
    usedAt: "2026-09-08T18:30:00",
    status: "USED",
  },
  {
    memberCouponId: 1003,
    couponId: 1,
    memberId: 13,
    orderId: null,
    issuedAt: "2026-09-05T09:15:00",
    usedAt: null,
    status: "ISSUED",
  },
  {
    memberCouponId: 1004,
    couponId: 3,
    memberId: 14,
    orderId: null,
    issuedAt: "2026-08-05T17:40:00",
    usedAt: null,
    status: "EXPIRED",
  },
];


function formatDate(dateValue) {
  if (!dateValue) {
    return "-";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(dateValue));
}


function formatMoney(value) {
  return Number(value || 0).toLocaleString("ko-KR");
}


function AdminCoupons() {

  const [activeTab, setActiveTab] =
    useState("COUPON");


  const [coupons] =
    useState(initialCoupons);

  const [memberCoupons] =
    useState(initialMemberCoupons);


  /* =========================
     쿠폰 필터
  ========================= */

  const [couponKeyword, setCouponKeyword] =
    useState("");

  const [discountType, setDiscountType] =
    useState("");

  const [couponStatus, setCouponStatus] =
    useState("");

  const [couponPage, setCouponPage] =
    useState(1);


  /* =========================
     회원쿠폰 필터
  ========================= */

  const [memberCouponKeyword, setMemberCouponKeyword] =
    useState("");

  const [memberCouponStatus, setMemberCouponStatus] =
    useState("");

  const [memberCouponPage, setMemberCouponPage] =
    useState(1);


  const pageSize = 8;


  /* =========================
     SUMMARY
  ========================= */

  const summary = useMemo(() => {

    return {

      totalCoupons: coupons.length,

      activeCoupons: coupons.filter(
        (coupon) =>
          coupon.status === "ACTIVE"
      ).length,

      expiredCoupons: coupons.filter(
        (coupon) =>
          coupon.status === "EXPIRED"
      ).length,

      issuedMemberCoupons:
        memberCoupons.length,
    };

  }, [
    coupons,
    memberCoupons,
  ]);


  /* =========================
     쿠폰 필터링
  ========================= */

  const filteredCoupons = useMemo(() => {

    const keyword =
      couponKeyword
        .trim()
        .toLowerCase();


    return coupons.filter((coupon) => {

      const keywordMatches =
        !keyword ||

        coupon.couponName
          .toLowerCase()
          .includes(keyword) ||

        coupon.couponCode
          .toLowerCase()
          .includes(keyword) ||

        String(coupon.couponId)
          .includes(keyword);


      const discountMatches =
        !discountType ||
        coupon.discountType ===
          discountType;


      const statusMatches =
        !couponStatus ||
        coupon.status ===
          couponStatus;


      return (
        keywordMatches &&
        discountMatches &&
        statusMatches
      );
    });

  }, [
    coupons,
    couponKeyword,
    discountType,
    couponStatus,
  ]);


  const couponTotalPages =
    Math.max(
      1,
      Math.ceil(
        filteredCoupons.length /
          pageSize
      )
    );


  const pagedCoupons =
    filteredCoupons.slice(
      (couponPage - 1) *
        pageSize,

      couponPage *
        pageSize
    );


  /* =========================
     회원쿠폰 필터링
  ========================= */

  const filteredMemberCoupons =
    useMemo(() => {

      const keyword =
        memberCouponKeyword
          .trim()
          .toLowerCase();


      return memberCoupons.filter(
        (memberCoupon) => {

          const coupon =
            coupons.find(
              (item) =>
                item.couponId ===
                memberCoupon.couponId
            );


          const keywordMatches =
            !keyword ||

            String(
              memberCoupon.memberCouponId
            ).includes(keyword) ||

            String(
              memberCoupon.memberId
            ).includes(keyword) ||

            String(
              memberCoupon.couponId
            ).includes(keyword) ||

            (
              coupon &&
              coupon.couponName
                .toLowerCase()
                .includes(keyword)
            ) ||

            (
              coupon &&
              coupon.couponCode
                .toLowerCase()
                .includes(keyword)
            );


          const statusMatches =
            !memberCouponStatus ||
            memberCoupon.status ===
              memberCouponStatus;


          return (
            keywordMatches &&
            statusMatches
          );
        }
      );

    }, [
      memberCoupons,
      coupons,
      memberCouponKeyword,
      memberCouponStatus,
    ]);


  const memberCouponTotalPages =
    Math.max(
      1,
      Math.ceil(
        filteredMemberCoupons.length /
          pageSize
      )
    );


  const pagedMemberCoupons =
    filteredMemberCoupons.slice(
      (memberCouponPage - 1) *
        pageSize,

      memberCouponPage *
        pageSize
    );


  /* =========================
     초기화
  ========================= */

  const handleCouponReset = () => {

    setCouponKeyword("");

    setDiscountType("");

    setCouponStatus("");

    setCouponPage(1);
  };


  const handleMemberCouponReset = () => {

    setMemberCouponKeyword("");

    setMemberCouponStatus("");

    setMemberCouponPage(1);
  };


  /* =========================
     쿠폰 찾기
  ========================= */

  const getCoupon =
    (couponId) => {

      return coupons.find(
        (coupon) =>
          coupon.couponId ===
            couponId
      );
    };


  return (

    <div className="acp-page">


      {/* =========================
          HEADER
      ========================= */}

      <header className="acp-page-header">

        <div>

          <h2>
            쿠폰 관리
          </h2>

          <p>
            쿠폰 정보와 회원별
            쿠폰 발급 내역을 관리하세요.
          </p>

        </div>


        {activeTab === "COUPON" && (

          <button
            type="button"
            className="acp-create-button"
          >

            <FontAwesomeIcon
              icon={faPlus}
            />

            쿠폰 등록

          </button>

        )}

      </header>



      {/* =========================
          SUMMARY
      ========================= */}

      <section className="acp-summary-grid">


        <div className="acp-summary-card">

          <div className="acp-summary-icon acp-summary-blue">

            <FontAwesomeIcon
              icon={faTicket}
            />

          </div>


          <div>

            <span>
              전체 쿠폰
            </span>

            <strong>
              {
                summary.totalCoupons
              }
            </strong>

          </div>

        </div>



        <div className="acp-summary-card">

          <div className="acp-summary-icon acp-summary-green">

            <FontAwesomeIcon
              icon={faCircleCheck}
            />

          </div>


          <div>

            <span>
              사용 가능 쿠폰
            </span>

            <strong>
              {
                summary.activeCoupons
              }
            </strong>

          </div>

        </div>



        <div className="acp-summary-card">

          <div className="acp-summary-icon acp-summary-red">

            <FontAwesomeIcon
              icon={faClock}
            />

          </div>


          <div>

            <span>
              만료 쿠폰
            </span>

            <strong>
              {
                summary.expiredCoupons
              }
            </strong>

          </div>

        </div>



        <div className="acp-summary-card">

          <div className="acp-summary-icon acp-summary-orange">

            <FontAwesomeIcon
              icon={faUsers}
            />

          </div>


          <div>

            <span>
              회원 발급 쿠폰
            </span>

            <strong>
              {
                summary.issuedMemberCoupons
              }
            </strong>

          </div>

        </div>


      </section>



      {/* =========================
          TAB
      ========================= */}

      <div className="acp-tabs">


        <button
          type="button"
          className={
            activeTab === "COUPON"
              ? "acp-tab-active"
              : ""
          }
          onClick={() => {

            setActiveTab(
              "COUPON"
            );

          }}
        >

          <FontAwesomeIcon
            icon={faTicket}
          />

          쿠폰 관리

        </button>



        <button
          type="button"
          className={
            activeTab ===
            "MEMBER_COUPON"
              ? "acp-tab-active"
              : ""
          }
          onClick={() => {

            setActiveTab(
              "MEMBER_COUPON"
            );

          }}
        >

          <FontAwesomeIcon
            icon={faUsers}
          />

          회원 발급 내역

        </button>


      </div>



      {/* =========================
          COUPON TAB
      ========================= */}

      {activeTab === "COUPON" && (

        <section className="acp-panel">


          {/* 검색/필터 */}

          <div className="acp-filter-bar">


            <label className="acp-search-box">

              <FontAwesomeIcon
                icon={faMagnifyingGlass}
              />


              <input
                type="search"
                value={couponKeyword}
                placeholder="쿠폰명, 쿠폰 코드 또는 쿠폰 ID 검색"
                onChange={(event) => {

                  setCouponKeyword(
                    event.target.value
                  );

                  setCouponPage(1);

                }}
              />

            </label>



            <div className="acp-filter-item">

              <span>
                할인 방식
              </span>


              <select
                value={discountType}
                onChange={(event) => {

                  setDiscountType(
                    event.target.value
                  );

                  setCouponPage(1);

                }}
              >

                <option value="">
                  전체
                </option>

                <option value="PERCENT">
                  정률 할인
                </option>

                <option value="FIXED">
                  정액 할인
                </option>

              </select>

            </div>



            <div className="acp-filter-item">

              <span>
                상태
              </span>


              <select
                value={couponStatus}
                onChange={(event) => {

                  setCouponStatus(
                    event.target.value
                  );

                  setCouponPage(1);

                }}
              >

                <option value="">
                  전체
                </option>

                <option value="ACTIVE">
                  사용 가능
                </option>

                <option value="EXPIRED">
                  만료
                </option>

              </select>

            </div>



            <button
              type="button"
              className="acp-reset-button"
              onClick={
                handleCouponReset
              }
            >

              <FontAwesomeIcon
                icon={faRotateRight}
              />

              초기화

            </button>


          </div>



          {/* 쿠폰 테이블 */}

          <div className="acp-table-scroll">

            <table className="acp-table acp-coupon-table">


              <thead>

                <tr>

                  <th>
                    쿠폰 ID
                  </th>

                  <th>
                    쿠폰 정보
                  </th>

                  <th>
                    할인
                  </th>

                  <th>
                    최소 주문금액
                  </th>

                  <th>
                    최대 할인금액
                  </th>

                  <th>
                    발급 방식
                  </th>

                  <th>
                    사용 기간
                  </th>

                  <th>
                    발급 현황
                  </th>

                  <th>
                    상태
                  </th>

                </tr>

              </thead>



              <tbody>


                {pagedCoupons.map(
                  (coupon) => (

                    <tr
                      key={
                        coupon.couponId
                      }
                    >


                      <td>

                        <strong className="acp-id">

                          {
                            coupon.couponId
                          }

                        </strong>

                      </td>



                      <td>

                        <div className="acp-coupon-info">

                          <strong>
                            {
                              coupon.couponName
                            }
                          </strong>

                          <span>
                            {
                              coupon.couponCode
                            }
                          </span>

                        </div>

                      </td>



                      <td>

                        <strong className="acp-discount">

                          {coupon.discountType ===
                          "PERCENT"
                            ? `${coupon.discountValue}%`
                            : `${formatMoney(
                                coupon.discountValue
                              )}원`}

                        </strong>

                      </td>



                      <td>

                        {formatMoney(
                          coupon.minOrderAmount
                        )}
                        원

                      </td>



                      <td>

                        {formatMoney(
                          coupon.maxDiscountAmount
                        )}
                        원

                      </td>



                      <td>

                        <span className="acp-issue-badge">

                          {
                            coupon.issueType
                          }

                        </span>

                      </td>



                      <td>

                        <div className="acp-period">

                          <span>
                            {formatDate(
                              coupon.validFrom
                            )}
                          </span>

                          <i>
                            ~
                          </i>

                          <span>
                            {formatDate(
                              coupon.validTo
                            )}
                          </span>

                        </div>

                      </td>



                      <td>

                        <div className="acp-issued">

                          <strong>
                            {
                              coupon.issuedCount
                            }
                          </strong>

                          <span>
                            /{" "}
                            {
                              coupon.usageLimit
                            }
                          </span>

                        </div>

                      </td>



                      <td>

                        <span
                          className={
                            coupon.status ===
                            "ACTIVE"
                              ? "acp-status acp-status-active"
                              : "acp-status acp-status-expired"
                          }
                        >

                          {coupon.status ===
                          "ACTIVE"
                            ? "사용 가능"
                            : "만료"}

                        </span>

                      </td>


                    </tr>

                  )
                )}



                {pagedCoupons.length ===
                  0 && (

                  <tr>

                    <td
                      colSpan={9}
                      className="acp-empty"
                    >

                      조건에 맞는
                      쿠폰이 없습니다.

                    </td>

                  </tr>

                )}


              </tbody>


            </table>

          </div>



          <footer className="acp-table-footer">


            <span>

              총{" "}

              <strong>
                {
                  filteredCoupons.length
                }
              </strong>

              개 쿠폰

            </span>



            <div className="acp-pagination">


              <button
                type="button"
                disabled={
                  couponPage === 1
                }
                onClick={() =>
                  setCouponPage(
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
                    couponTotalPages,
                },
                (_, index) =>
                  index + 1
              ).map(
                (pageNumber) => (

                  <button
                    key={pageNumber}
                    type="button"
                    className={
                      couponPage ===
                      pageNumber
                        ? "acp-page-active"
                        : ""
                    }
                    onClick={() =>
                      setCouponPage(
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
                  couponPage ===
                  couponTotalPages
                }
                onClick={() =>
                  setCouponPage(
                    (current) =>
                      Math.min(
                        couponTotalPages,
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

      )}



      {/* =========================
          MEMBER_COUPON TAB
      ========================= */}

      {activeTab === "MEMBER_COUPON" && (

        <section className="acp-panel">


          <div className="acp-member-filter-bar">


            <label className="acp-search-box">

              <FontAwesomeIcon
                icon={faMagnifyingGlass}
              />


              <input
                type="search"
                value={
                  memberCouponKeyword
                }
                placeholder="회원 ID, 쿠폰명, 쿠폰 코드 또는 발급 ID 검색"
                onChange={(event) => {

                  setMemberCouponKeyword(
                    event.target.value
                  );

                  setMemberCouponPage(1);

                }}
              />

            </label>



            <div className="acp-filter-item">

              <span>
                상태
              </span>


              <select
                value={
                  memberCouponStatus
                }
                onChange={(event) => {

                  setMemberCouponStatus(
                    event.target.value
                  );

                  setMemberCouponPage(1);

                }}
              >

                <option value="">
                  전체
                </option>

                <option value="ISSUED">
                  사용 가능
                </option>

                <option value="USED">
                  사용 완료
                </option>

                <option value="EXPIRED">
                  만료
                </option>

              </select>

            </div>



            <button
              type="button"
              className="acp-reset-button"
              onClick={
                handleMemberCouponReset
              }
            >

              <FontAwesomeIcon
                icon={faRotateRight}
              />

              초기화

            </button>


          </div>



          <div className="acp-table-scroll">

            <table className="acp-table acp-member-coupon-table">


              <thead>

                <tr>

                  <th>
                    발급 ID
                  </th>

                  <th>
                    회원 ID
                  </th>

                  <th>
                    쿠폰 정보
                  </th>

                  <th>
                    쿠폰 ID
                  </th>

                  <th>
                    주문 ID
                  </th>

                  <th>
                    발급일
                  </th>

                  <th>
                    사용일
                  </th>

                  <th>
                    상태
                  </th>

                </tr>

              </thead>



              <tbody>


                {pagedMemberCoupons.map(
                  (memberCoupon) => {

                    const coupon =
                      getCoupon(
                        memberCoupon.couponId
                      );


                    return (

                      <tr
                        key={
                          memberCoupon.memberCouponId
                        }
                      >


                        <td>

                          <strong className="acp-id">

                            {
                              memberCoupon.memberCouponId
                            }

                          </strong>

                        </td>



                        <td>

                          <strong className="acp-member-id">

                            #
                            {
                              memberCoupon.memberId
                            }

                          </strong>

                        </td>



                        <td>

                          <div className="acp-coupon-info">

                            <strong>

                              {coupon
                                ? coupon.couponName
                                : "-"}

                            </strong>

                            <span>

                              {coupon
                                ? coupon.couponCode
                                : "-"}

                            </span>

                          </div>

                        </td>



                        <td>

                          {
                            memberCoupon.couponId
                          }

                        </td>



                        <td>

                          {
                            memberCoupon.orderId
                              ? `#${memberCoupon.orderId}`
                              : "-"
                          }

                        </td>



                        <td>

                          {formatDate(
                            memberCoupon.issuedAt
                          )}

                        </td>



                        <td>

                          {formatDate(
                            memberCoupon.usedAt
                          )}

                        </td>



                        <td>

                          <span
                            className={`acp-member-status acp-member-status-${memberCoupon.status.toLowerCase()}`}
                          >

                            {memberCoupon.status ===
                            "ISSUED"
                              ? "사용 가능"
                              : memberCoupon.status ===
                                "USED"
                              ? "사용 완료"
                              : "만료"}

                          </span>

                        </td>


                      </tr>

                    );

                  }
                )}



                {pagedMemberCoupons.length ===
                  0 && (

                  <tr>

                    <td
                      colSpan={8}
                      className="acp-empty"
                    >

                      조건에 맞는
                      발급 내역이 없습니다.

                    </td>

                  </tr>

                )}


              </tbody>


            </table>

          </div>



          <footer className="acp-table-footer">


            <span>

              총{" "}

              <strong>
                {
                  filteredMemberCoupons.length
                }
              </strong>

              건의 발급 내역

            </span>



            <div className="acp-pagination">


              <button
                type="button"
                disabled={
                  memberCouponPage === 1
                }
                onClick={() =>
                  setMemberCouponPage(
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
                    memberCouponTotalPages,
                },
                (_, index) =>
                  index + 1
              ).map(
                (pageNumber) => (

                  <button
                    key={pageNumber}
                    type="button"
                    className={
                      memberCouponPage ===
                      pageNumber
                        ? "acp-page-active"
                        : ""
                    }
                    onClick={() =>
                      setMemberCouponPage(
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
                  memberCouponPage ===
                  memberCouponTotalPages
                }
                onClick={() =>
                  setMemberCouponPage(
                    (current) =>
                      Math.min(
                        memberCouponTotalPages,
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

      )}


    </div>
  );
}


export default AdminCoupons;
