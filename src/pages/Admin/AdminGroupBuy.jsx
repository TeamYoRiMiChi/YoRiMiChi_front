import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
  faClock,
  faMagnifyingGlass,
  faPlus,
  faRotateRight,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import AdminStatusBox from "../../components/Admin/Admin_statusBox";
import "./AdminGroupBuy.css";

const initialGroupBuys = [
  {
    groupBuyId: 301,
    productId: 1023,
    creatorId: 11,
    title: "일본 A5 와규 공동구매",
    targetQuantity: 100,
    currentQuantity: 82,
    startDate: "2026-09-01T10:00:00",
    endDate: "2026-09-20T23:59:59",
    status: "RECRUITING",

    creator: {
      name: "김서연",
      email: "seoyeon@example.com",
    },

    product: {
      productName: "일본 와규 등심",
      productNameJp: "和牛サーロイン",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=160&h=140&fit=crop",
    },

    participantCount: 64,
    commentCount: 18,
  },
  {
    groupBuyId: 302,
    productId: 1021,
    creatorId: 12,
    title: "우지 말차 초콜릿 한정 공동구매",
    targetQuantity: 200,
    currentQuantity: 200,
    startDate: "2026-08-20T09:00:00",
    endDate: "2026-09-10T23:59:59",
    status: "SUCCESS",

    creator: {
      name: "이준호",
      email: "junho@example.com",
    },

    product: {
      productName: "우지 말차 초콜릿",
      productNameJp: "宇治抹茶チョコレート",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=160&h=140&fit=crop",
    },

    participantCount: 143,
    commentCount: 37,
  },
  {
    groupBuyId: 303,
    productId: 1019,
    creatorId: 13,
    title: "사누키 우동 4인 세트",
    targetQuantity: 150,
    currentQuantity: 46,
    startDate: "2026-09-05T12:00:00",
    endDate: "2026-09-25T23:59:59",
    status: "RECRUITING",

    creator: {
      name: "박지민",
      email: "jimin@example.com",
    },

    product: {
      productName: "사누키 우동 세트",
      productNameJp: "讃岐うどんセット",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=160&h=140&fit=crop",
    },

    participantCount: 38,
    commentCount: 12,
  },
  {
    groupBuyId: 304,
    productId: 1018,
    creatorId: 14,
    title: "후쿠오카 명란젓 공동구매",
    targetQuantity: 80,
    currentQuantity: 57,
    startDate: "2026-08-15T10:00:00",
    endDate: "2026-09-05T23:59:59",
    status: "CLOSED",

    creator: {
      name: "최민수",
      email: "minsu@example.com",
    },

    product: {
      productName: "후쿠오카 명란젓",
      productNameJp: "福岡明太子",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=160&h=140&fit=crop",
    },

    participantCount: 45,
    commentCount: 9,
  },
  {
    groupBuyId: 305,
    productId: 1017,
    creatorId: 15,
    title: "홋카이도 유제품 공동구매",
    targetQuantity: 120,
    currentQuantity: 21,
    startDate: "2026-08-10T10:00:00",
    endDate: "2026-08-30T23:59:59",
    status: "CANCELED",

    creator: {
      name: "정하은",
      email: "haeun@example.com",
    },

    product: {
      productName: "홋카이도 치즈 세트",
      productNameJp: "北海道チーズセット",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=160&h=140&fit=crop",
    },

    participantCount: 17,
    commentCount: 4,
  },
  {
    groupBuyId: 306,
    productId: 1016,
    creatorId: 16,
    title: "오키나와 흑당 디저트 세트",
    targetQuantity: 60,
    currentQuantity: 60,
    startDate: "2026-08-01T10:00:00",
    endDate: "2026-08-20T23:59:59",
    status: "SUCCESS",

    creator: {
      name: "강도윤",
      email: "doyun@example.com",
    },

    product: {
      productName: "오키나와 흑당 세트",
      productNameJp: "沖縄黒糖セット",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=160&h=140&fit=crop",
    },

    participantCount: 51,
    commentCount: 23,
  },
];

const statusText = {
  RECRUITING: "모집 중",
  SUCCESS: "공동구매 성공",
  CLOSED: "모집 종료",
  CANCELED: "취소",
};

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(dateValue));
}

function AdminGroupBuy() {
  const navigate = useNavigate();

  const [groupBuys, setGroupBuys] =
    useState(initialGroupBuys);

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);

  const totalPages = 5;

  const summary = useMemo(() => {
    return {
      total: groupBuys.length,

      recruiting: groupBuys.filter(
        (groupBuy) =>
          groupBuy.status === "RECRUITING"
      ).length,

      success: groupBuys.filter(
        (groupBuy) =>
          groupBuy.status === "SUCCESS"
      ).length,

      finished: groupBuys.filter(
        (groupBuy) =>
          groupBuy.status === "CLOSED" ||
          groupBuy.status === "CANCELED"
      ).length,
    };
  }, [groupBuys]);

  const summaryItems = [
    {
      key: "total",
      label: "전체 공동구매",
      value: summary.total,
      icon: faUsers,
      color: "blue",
    },
    {
      key: "recruiting",
      label: "모집 중",
      value: summary.recruiting,
      icon: faBullhorn,
      color: "green",
    },
    {
      key: "success",
      label: "공동구매 성공",
      value: summary.success,
      icon: faCheckCircle,
      color: "orange",
    },
    {
      key: "finished",
      label: "종료·취소",
      value: summary.finished,
      icon: faClock,
      color: "red",
    },
  ];

  const filteredGroupBuys = useMemo(() => {
    const normalizedKeyword =
      keyword.trim().toLowerCase();

    return groupBuys.filter((groupBuy) => {
      const progressRate =
        groupBuy.targetQuantity === 0
          ? 0
          : (groupBuy.currentQuantity /
              groupBuy.targetQuantity) *
            100;

      const keywordMatches =
        !normalizedKeyword ||
        groupBuy.title
          .toLowerCase()
          .includes(normalizedKeyword) ||
        groupBuy.product.productName
          .toLowerCase()
          .includes(normalizedKeyword) ||
        groupBuy.creator.name
          .toLowerCase()
          .includes(normalizedKeyword);

      const statusMatches =
        !status || groupBuy.status === status;

      const progressMatches =
        !progress ||
        (progress === "UNDER_50" &&
          progressRate < 50) ||
        (progress === "OVER_50" &&
          progressRate >= 50 &&
          progressRate < 100) ||
        (progress === "COMPLETE" &&
          progressRate >= 100);

      return (
        keywordMatches &&
        statusMatches &&
        progressMatches
      );
    });
  }, [groupBuys, keyword, status, progress]);

  const visibleIds = filteredGroupBuys.map(
    (groupBuy) => groupBuy.groupBuyId
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
          (id) => !visibleIds.includes(id)
        )
      );

      return;
    }

    setSelectedIds((current) => [
      ...new Set([...current, ...visibleIds]),
    ]);
  };

  const handleSelectItem = (groupBuyId) => {
    setSelectedIds((current) => {
      if (current.includes(groupBuyId)) {
        return current.filter(
          (id) => id !== groupBuyId
        );
      }

      return [...current, groupBuyId];
    });
  };

  const handleReset = () => {
    setKeyword("");
    setStatus("");
    setProgress("");
    setPage(1);
  };

  const handleBulkStatusChange = (event) => {
    const nextStatus = event.target.value;

    if (
      !nextStatus ||
      selectedIds.length === 0
    ) {
      return;
    }

    setGroupBuys((current) =>
      current.map((groupBuy) => {
        if (
          !selectedIds.includes(
            groupBuy.groupBuyId
          )
        ) {
          return groupBuy;
        }

        return {
          ...groupBuy,
          status: nextStatus,
        };
      })
    );

    event.target.value = "";
    setSelectedIds([]);
  };

  return (
    <div className="agb-page">
      <header className="agb-page-header">
        <div>
          <h2>공동구매 관리</h2>
          <p>
            공동구매 모집 현황과 참여 상태를
            관리하세요.
          </p>
        </div>

        <button
          className="agb-create-button"
          type="button"
          onClick={() =>
            navigate("/admin/groupbuy/new")
          }
        >
          <FontAwesomeIcon icon={faPlus} />
          공동구매 등록
        </button>
      </header>

      <AdminStatusBox items={summaryItems} />

      <section className="agb-panel">
        <div className="agb-filter-bar">
          <label className="agb-search-box">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
            />

            <input
              type="search"
              value={keyword}
              onChange={(event) => {
                setKeyword(event.target.value);
                setPage(1);
              }}
              placeholder="공동구매명, 상품명 또는 등록자 검색"
            />
          </label>

          <div className="agb-filter-item">
            <span>진행 상태</span>

            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
            >
              <option value="">전체</option>
              <option value="RECRUITING">
                모집 중
              </option>
              <option value="SUCCESS">
                공동구매 성공
              </option>
              <option value="CLOSED">
                모집 종료
              </option>
              <option value="CANCELED">
                취소
              </option>
            </select>
          </div>

          <div className="agb-filter-item">
            <span>달성률</span>

            <select
              value={progress}
              onChange={(event) => {
                setProgress(event.target.value);
                setPage(1);
              }}
            >
              <option value="">전체</option>
              <option value="UNDER_50">
                50% 미만
              </option>
              <option value="OVER_50">
                50% 이상
              </option>
              <option value="COMPLETE">
                100% 달성
              </option>
            </select>
          </div>

          <button
            className="agb-reset-button"
            type="button"
            onClick={handleReset}
          >
            <FontAwesomeIcon icon={faRotateRight} />
            초기화
          </button>
        </div>

        <div className="agb-table-scroll">
          <table className="agb-table">
            <thead>
              <tr>
                <th className="agb-checkbox-cell">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    aria-label="전체 공동구매 선택"
                  />
                </th>

                <th>공동구매 정보</th>
                <th>공동구매 ID</th>
                <th>등록자</th>
                <th>모집 기간</th>
                <th>수량·달성률</th>
                <th>참여자</th>
                <th>댓글</th>
                <th>진행 상태</th>
              </tr>
            </thead>

            <tbody>
              {filteredGroupBuys.map(
                (groupBuy) => {
                  const progressRate =
                    groupBuy.targetQuantity === 0
                      ? 0
                      : Math.min(
                          100,
                          Math.round(
                            (groupBuy.currentQuantity /
                              groupBuy.targetQuantity) *
                              100
                          )
                        );

                  return (
                    <tr key={groupBuy.groupBuyId}>
                      <td className="agb-checkbox-cell">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(
                            groupBuy.groupBuyId
                          )}
                          onChange={() =>
                            handleSelectItem(
                              groupBuy.groupBuyId
                            )
                          }
                          aria-label={`${groupBuy.title} 선택`}
                        />
                      </td>

                      <td>
                        <div className="agb-product-info">
                          <img
                            src={
                              groupBuy.product
                                .thumbnailUrl
                            }
                            alt={
                              groupBuy.product
                                .productName
                            }
                          />

                          <div>
                            <strong>
                              {groupBuy.title}
                            </strong>

                            <p>
                              {
                                groupBuy.product
                                  .productName
                              }
                            </p>

                            <span>
                              {
                                groupBuy.product
                                  .productNameJp
                              }
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="agb-id">
                        {groupBuy.groupBuyId}
                      </td>

                      <td>
                        <div className="agb-creator-info">
                          <strong>
                            {groupBuy.creator.name}
                          </strong>

                          <span>
                            {groupBuy.creator.email}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="agb-period">
                          <span>
                            {formatDate(
                              groupBuy.startDate
                            )}
                          </span>

                          <i>~</i>

                          <span>
                            {formatDate(
                              groupBuy.endDate
                            )}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="agb-progress-info">
                          <div className="agb-progress-label">
                            <strong>
                              {
                                groupBuy.currentQuantity
                              }
                            </strong>

                            <span>
                              /{" "}
                              {
                                groupBuy.targetQuantity
                              }
                            </span>

                            <b>{progressRate}%</b>
                          </div>

                          <div className="agb-progress-bar">
                            <span
                              style={{
                                width: `${progressRate}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td>
                        <strong className="agb-count">
                          {groupBuy.participantCount}명
                        </strong>
                      </td>

                      <td>
                        <span className="agb-comment-count">
                          {groupBuy.commentCount}개
                        </span>
                      </td>

                      <td>
                        <span
                          className={`agb-status-badge agb-status-${groupBuy.status.toLowerCase()}`}
                        >
                          {statusText[groupBuy.status]}
                        </span>
                      </td>
                    </tr>
                  );
                }
              )}

              {filteredGroupBuys.length === 0 && (
                <tr>
                  <td
                    className="agb-empty"
                    colSpan={9}
                  >
                    조건에 맞는 공동구매가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="agb-table-footer">
          <div className="agb-bulk-actions">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
              aria-label="전체 공동구매 선택"
            />

            <select
              defaultValue=""
              disabled={selectedIds.length === 0}
              onChange={handleBulkStatusChange}
            >
              <option value="" disabled>
                선택 상태 변경
              </option>

              <option value="RECRUITING">
                모집 중
              </option>

              <option value="SUCCESS">
                공동구매 성공
              </option>

              <option value="CLOSED">
                모집 종료
              </option>

              <option value="CANCELED">
                취소
              </option>
            </select>

            <span>
              총 {filteredGroupBuys.length}개 공동구매
            </span>
          </div>

          <div className="agb-pagination">
            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage((current) =>
                  Math.max(1, current - 1)
                )
              }
              aria-label="이전 페이지"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
              />
            </button>

            {[1, 2, 3, 4, 5].map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  className={
                    page === pageNumber
                      ? "agb-page-active"
                      : ""
                  }
                  onClick={() =>
                    setPage(pageNumber)
                  }
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() =>
                setPage((current) =>
                  Math.min(
                    totalPages,
                    current + 1
                  )
                )
              }
              aria-label="다음 페이지"
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

export default AdminGroupBuy;
