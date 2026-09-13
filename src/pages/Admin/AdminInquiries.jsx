//이대로할려면 테이블하나더필요함 INQUIRY
/*- inquiry_id PK
- member_id FK
- category
- title
- content
- status
- answer
- created_at
- answered_at*/

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
  faClock,
  faEnvelope,
  faMagnifyingGlass,
  faMessage,
  faPen,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

import "./AdminInquiries.css";


const initialInquiries = [
  {
    inquiryId: 1001,
    memberId: 1,
    memberName: "안지윤",
    email: "jiyun@example.com",
    category: "ORDER",
    title: "주문 상태가 변경되지 않습니다.",
    content: "결제를 완료했는데 주문 상태가 계속 결제 대기로 표시됩니다.",
    createdAt: "2026-09-13T09:10:00",
    status: "WAITING",
    answer: "",
    answeredAt: null,
  },
  {
    inquiryId: 1002,
    memberId: 5,
    memberName: "박유나",
    email: "yuna@example.com",
    category: "DELIVERY",
    title: "배송 조회 문의드립니다.",
    content: "운송장 번호를 확인하고 싶습니다.",
    createdAt: "2026-09-12T14:20:00",
    status: "ANSWERED",
    answer: "마이페이지 주문 상세에서 운송장 번호를 확인하실 수 있습니다.",
    answeredAt: "2026-09-12T16:30:00",
  },
  {
    inquiryId: 1003,
    memberId: 2,
    memberName: "김민수",
    email: "minsu@example.com",
    category: "PRODUCT",
    title: "상품 재입고 예정이 있나요?",
    content: "품절된 상품 재입고 일정을 알고 싶습니다.",
    createdAt: "2026-09-11T10:40:00",
    status: "WAITING",
    answer: "",
    answeredAt: null,
  },
  {
    inquiryId: 1004,
    memberId: 3,
    memberName: "이소라",
    email: "sora@example.com",
    category: "GROUP_BUY",
    title: "공동구매 취소 관련 문의",
    content: "참여 중인 공동구매를 취소할 수 있는지 궁금합니다.",
    createdAt: "2026-09-10T11:30:00",
    status: "ANSWERED",
    answer: "모집 마감 전에는 마이페이지에서 참여 취소가 가능합니다.",
    answeredAt: "2026-09-10T13:10:00",
  },
];


const categoryText = {
  ORDER: "주문",
  DELIVERY: "배송",
  PRODUCT: "상품",
  GROUP_BUY: "공동구매",
  ETC: "기타",
};


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


function AdminInquiries() {

  const [inquiries, setInquiries] =
    useState(initialInquiries);

  const [keyword, setKeyword] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [selectedInquiry, setSelectedInquiry] =
    useState(null);

  const [answerText, setAnswerText] =
    useState("");


  const pageSize = 8;


  const summary = useMemo(() => {

    return {
      total: inquiries.length,

      waiting: inquiries.filter(
        (item) =>
          item.status === "WAITING"
      ).length,

      answered: inquiries.filter(
        (item) =>
          item.status === "ANSWERED"
      ).length,
    };

  }, [inquiries]);


  const filteredInquiries = useMemo(() => {

    const normalizedKeyword =
      keyword.trim().toLowerCase();


    return inquiries.filter((item) => {

      const keywordMatches =
        !normalizedKeyword ||

        item.title
          .toLowerCase()
          .includes(normalizedKeyword) ||

        item.memberName
          .toLowerCase()
          .includes(normalizedKeyword) ||

        item.email
          .toLowerCase()
          .includes(normalizedKeyword) ||

        String(item.inquiryId)
          .includes(normalizedKeyword);


      const statusMatches =
        !statusFilter ||
        item.status === statusFilter;


      const categoryMatches =
        !categoryFilter ||
        item.category === categoryFilter;


      return (
        keywordMatches &&
        statusMatches &&
        categoryMatches
      );
    });

  }, [
    inquiries,
    keyword,
    statusFilter,
    categoryFilter,
  ]);


  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredInquiries.length /
          pageSize
      )
    );


  const pagedInquiries =
    filteredInquiries.slice(
      (page - 1) * pageSize,
      page * pageSize
    );


  const handleReset = () => {

    setKeyword("");

    setStatusFilter("");

    setCategoryFilter("");

    setPage(1);
  };


  const handleOpenAnswer = (inquiry) => {

    setSelectedInquiry(inquiry);

    setAnswerText(
      inquiry.answer || ""
    );
  };


  const handleCloseAnswer = () => {

    setSelectedInquiry(null);

    setAnswerText("");
  };


  const handleSubmitAnswer = () => {

    if (!answerText.trim()) {

      alert("답변 내용을 입력해주세요.");

      return;
    }


    setInquiries((current) =>
      current.map((item) => {

        if (
          item.inquiryId !==
          selectedInquiry.inquiryId
        ) {
          return item;
        }


        return {
          ...item,
          answer: answerText.trim(),
          status: "ANSWERED",
          answeredAt:
            new Date().toISOString(),
        };
      })
    );


    handleCloseAnswer();
  };


  return (

    <div className="ai-page">


      <header className="ai-page-header">

        <div>

          <h2>
            문의답변 관리
          </h2>

          <p>
            회원 문의를 확인하고
            답변 상태를 관리하세요.
          </p>

        </div>

      </header>



      <section className="ai-summary-grid">


        <div className="ai-summary-card">

          <div className="ai-summary-icon ai-summary-blue">

            <FontAwesomeIcon
              icon={faMessage}
            />

          </div>


          <div>

            <span>
              전체 문의
            </span>

            <strong>
              {summary.total}
            </strong>

          </div>

        </div>


        <div className="ai-summary-card">

          <div className="ai-summary-icon ai-summary-orange">

            <FontAwesomeIcon
              icon={faClock}
            />

          </div>


          <div>

            <span>
              답변 대기
            </span>

            <strong>
              {summary.waiting}
            </strong>

          </div>

        </div>


        <div className="ai-summary-card">

          <div className="ai-summary-icon ai-summary-green">

            <FontAwesomeIcon
              icon={faCircleCheck}
            />

          </div>


          <div>

            <span>
              답변 완료
            </span>

            <strong>
              {summary.answered}
            </strong>

          </div>

        </div>


      </section>



      <section className="ai-panel">


        <div className="ai-filter-bar">


          <label className="ai-search-box">

            <FontAwesomeIcon
              icon={faMagnifyingGlass}
            />


            <input
              type="search"
              value={keyword}
              placeholder="문의 제목, 회원명, 이메일 또는 문의 ID 검색"
              onChange={(event) => {

                setKeyword(
                  event.target.value
                );

                setPage(1);
              }}
            />

          </label>



          <div className="ai-filter-item">

            <span>
              문의 유형
            </span>


            <select
              value={categoryFilter}
              onChange={(event) => {

                setCategoryFilter(
                  event.target.value
                );

                setPage(1);
              }}
            >

              <option value="">
                전체
              </option>

              <option value="ORDER">
                주문
              </option>

              <option value="DELIVERY">
                배송
              </option>

              <option value="PRODUCT">
                상품
              </option>

              <option value="GROUP_BUY">
                공동구매
              </option>

              <option value="ETC">
                기타
              </option>

            </select>

          </div>



          <div className="ai-filter-item">

            <span>
              답변 상태
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

              <option value="WAITING">
                답변 대기
              </option>

              <option value="ANSWERED">
                답변 완료
              </option>

            </select>

          </div>



          <button
            type="button"
            className="ai-reset-button"
            onClick={handleReset}
          >

            <FontAwesomeIcon
              icon={faRotateRight}
            />

            초기화

          </button>

        </div>



        <div className="ai-table-scroll">

          <table className="ai-table">


            <thead>

              <tr>

                <th>
                  문의 ID
                </th>

                <th>
                  문의 정보
                </th>

                <th>
                  회원
                </th>

                <th>
                  문의 유형
                </th>

                <th>
                  문의일
                </th>

                <th>
                  답변 상태
                </th>

                <th>
                  답변일
                </th>

                <th>
                  관리
                </th>

              </tr>

            </thead>


            <tbody>


              {pagedInquiries.map(
                (item) => (

                  <tr
                    key={
                      item.inquiryId
                    }
                  >


                    <td>

                      <strong className="ai-id">

                        {item.inquiryId}

                      </strong>

                    </td>



                    <td>

                      <div className="ai-inquiry-info">

                        <strong>
                          {item.title}
                        </strong>

                        <span>
                          {item.content}
                        </span>

                      </div>

                    </td>



                    <td>

                      <div className="ai-member-info">

                        <strong>
                          {item.memberName}
                        </strong>

                        <span>
                          {item.email}
                        </span>

                      </div>

                    </td>



                    <td>

                      <span className="ai-category-badge">

                        {
                          categoryText[
                            item.category
                          ]
                        }

                      </span>

                    </td>



                    <td>

                      <span className="ai-date">

                        {formatDate(
                          item.createdAt
                        )}

                      </span>

                    </td>



                    <td>

                      <span
                        className={
                          item.status ===
                          "ANSWERED"
                            ? "ai-status-badge ai-status-answered"
                            : "ai-status-badge ai-status-waiting"
                        }
                      >

                        {item.status ===
                        "ANSWERED"
                          ? "답변 완료"
                          : "답변 대기"}

                      </span>

                    </td>



                    <td>

                      <span className="ai-date">

                        {formatDate(
                          item.answeredAt
                        )}

                      </span>

                    </td>



                    <td>

                      <button
                        type="button"
                        className={
                          item.status ===
                          "ANSWERED"
                            ? "ai-answer-button ai-answer-edit"
                            : "ai-answer-button"
                        }
                        onClick={() =>
                          handleOpenAnswer(
                            item
                          )
                        }
                      >

                        <FontAwesomeIcon
                          icon={
                            item.status ===
                            "ANSWERED"
                              ? faPen
                              : faEnvelope
                          }
                        />

                        {item.status ===
                        "ANSWERED"
                          ? "답변 수정"
                          : "답변 작성"}

                      </button>

                    </td>


                  </tr>

                )
              )}



              {pagedInquiries.length ===
                0 && (

                <tr>

                  <td
                    colSpan={8}
                    className="ai-empty"
                  >

                    조건에 맞는
                    문의가 없습니다.

                  </td>

                </tr>

              )}


            </tbody>


          </table>

        </div>



        <footer className="ai-table-footer">


          <span>

            총{" "}

            <strong>
              {
                filteredInquiries.length
              }
            </strong>

            건의 문의

          </span>



          <div className="ai-pagination">


            <button
              type="button"
              disabled={
                page === 1
              }
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
                      ? "ai-page-active"
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



      {selectedInquiry && (

        <div className="ai-modal-backdrop">

          <div className="ai-modal">


            <div className="ai-modal-header">

              <div>

                <span>
                  문의 #{selectedInquiry.inquiryId}
                </span>

                <h3>
                  {selectedInquiry.title}
                </h3>

              </div>


              <button
                type="button"
                onClick={handleCloseAnswer}
              >
                ×
              </button>

            </div>



            <div className="ai-modal-question">

              <div className="ai-modal-meta">

                <span>
                  {selectedInquiry.memberName}
                </span>

                <span>
                  {selectedInquiry.email}
                </span>

                <span>
                  {formatDate(
                    selectedInquiry.createdAt
                  )}
                </span>

              </div>


              <p>
                {selectedInquiry.content}
              </p>

            </div>



            <div className="ai-answer-area">

              <label>
                관리자 답변
              </label>


              <textarea
                value={answerText}
                placeholder="회원에게 전달할 답변을 입력해주세요."
                onChange={(event) =>
                  setAnswerText(
                    event.target.value
                  )
                }
              />

            </div>



            <div className="ai-modal-actions">

              <button
                type="button"
                className="ai-modal-cancel"
                onClick={handleCloseAnswer}
              >
                취소
              </button>


              <button
                type="button"
                className="ai-modal-save"
                onClick={handleSubmitAnswer}
              >
                답변 저장
              </button>

            </div>


          </div>

        </div>

      )}


    </div>

  );
}


export default AdminInquiries;
