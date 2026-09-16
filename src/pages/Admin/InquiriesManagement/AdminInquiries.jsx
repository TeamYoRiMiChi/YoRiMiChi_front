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
import useAdminInquiries from "../../../hooks/Admin/useAdminInquiries";
import AdminInquiryAnswerModal from "../../../components/Admin/Inquiries/AdminInquiryAnswerModal";


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
  const {
    summary, filteredInquiries, pagedInquiries, totalPages, loading, loadError, answering,
    keyword, setKeyword, statusFilter, setStatusFilter, categoryFilter,
    setCategoryFilter, page, setPage, selectedInquiry, answerText,
    setAnswerText, handleReset, handleOpenAnswer, handleCloseAnswer,
    handleSubmitAnswer,
  } = useAdminInquiries();

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



        {loading && <p className="ai-state-message">문의 목록을 불러오는 중입니다.</p>}
        {loadError && <p className="ai-state-message ai-state-error">{loadError}</p>}

        {!loading && !loadError && <div className="ai-table-scroll">

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

        </div>}



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



      <AdminInquiryAnswerModal
        inquiry={selectedInquiry}
        answerText={answerText}
        answering={answering}
        formatDate={formatDate}
        onAnswerChange={setAnswerText}
        onClose={handleCloseAnswer}
        onSubmit={handleSubmitAnswer}
      />


    </div>

  );
}


export default AdminInquiries;

