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
  ORDER: "注文・決済",
  DELIVERY: "配送",
  PRODUCT: "商品",
  GROUP_BUY: "共同購入",
  ETC: "その他",
};


function formatDate(dateValue) {
  if (!dateValue) {
    return "-";
  }

  return new Intl.DateTimeFormat("ja-JP", {
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
            お問い合わせ管理
          </h2>

          <p>
            会員のお問い合わせを確認し
            回答状況を管理してください。
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
              全お問い合わせ
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
              回答待ち
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
              回答完了
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
              placeholder="お問い合わせタイトル、会員名、メールまたはお問い合わせIDで検索"
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
              お問い合わせ種別
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
                すべて
              </option>

              <option value="ORDER">
                注文・決済
              </option>

              <option value="DELIVERY">
                配送
              </option>

              <option value="PRODUCT">
                商品
              </option>

              <option value="GROUP_BUY">
                共同購入
              </option>

              <option value="ETC">
                その他
              </option>

            </select>

          </div>



          <div className="ai-filter-item">

            <span>
              回答状況
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
                すべて
              </option>

              <option value="WAITING">
                回答待ち
              </option>

              <option value="ANSWERED">
                回答完了
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

            リセット

          </button>

        </div>



        {loading && <p className="ai-state-message">お問い合わせ一覧を読み込み中です。</p>}
        {loadError && <p className="ai-state-message ai-state-error">{loadError}</p>}

        {!loading && !loadError && <div className="ai-table-scroll">

          <table className="ai-table">


            <thead>

              <tr>

                <th>
                  お問い合わせID
                </th>

                <th>
                  お問い合わせ情報
                </th>

                <th>
                  会員
                </th>

                <th>
                  お問い合わせ種別
                </th>

                <th>
                  お問い合わせ日
                </th>

                <th>
                  回答状況
                </th>

                <th>
                  回答日
                </th>

                <th>
                  管理
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
                          ? "回答完了"
                          : "回答待ち"}

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
                          ? "回答修正"
                          : "回答する"}

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

                    条件に合う
                    お問い合わせがありません。

                  </td>

                </tr>

              )}


            </tbody>


          </table>

        </div>}



        <footer className="ai-table-footer">


          <span>

            合計{" "}

            <strong>
              {
                filteredInquiries.length
              }
            </strong>

            件のお問い合わせ

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
              aria-label="前のページ"
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
              aria-label="次のページ"
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
