import { useEffect, useState } from "react";

import "../../../pages/Admin/GroupBuyManagement/AdminGroupBuy.css";

const statusText = {
  RECRUITING: "모집 중",
  SUCCESS: "공동구매 성공",
  FAILED: "모집 실패",
  CANCELLED: "취소",
};

function formatDateTime(dateValue) {
  if (!dateValue) {
    return "-";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateValue));
}

// <input type="datetime-local">에 넣을 수 있는 형식으로 변환
function toDateTimeLocalValue(dateValue) {
  if (!dateValue) {
    return "";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const pad = (value) => String(value).padStart(2, "0");

  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

function AdminGroupBuyDetailModal({
  detail,
  isLoading,
  isSaving,
  onClose,
  onSaveInfo,
  onChangeStatus,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [statusDraft, setStatusDraft] = useState("");

  useEffect(() => {
    if (!detail) {
      return;
    }

    setForm({
      title: detail.title ?? "",
      description: detail.description ?? "",
      targetQuantity: detail.targetQuantity ?? 0,
      startDate: toDateTimeLocalValue(detail.startDate),
      endDate: toDateTimeLocalValue(detail.endDate),
    });

    setStatusDraft(detail.status ?? "");
    setIsEditing(false);
  }, [detail]);

  const progressRate =
    !detail || !detail.targetQuantity
      ? 0
      : Math.min(
          100,
          Math.round((detail.currentQuantity / detail.targetQuantity) * 100),
        );

  const handleFormChange = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSave = async () => {
    if (!form) {
      return;
    }

    const targetQuantity = Number(form.targetQuantity);

    if (!form.title.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }

    if (!Number.isFinite(targetQuantity) || targetQuantity < 1) {
      alert("목표 수량을 올바르게 입력해 주세요.");
      return;
    }

    const ok = await onSaveInfo(detail.groupBuyId, {
      title: form.title.trim(),
      description: form.description,
      targetQuantity,
      startDate: form.startDate ? `${form.startDate}:00` : null,
      endDate: form.endDate ? `${form.endDate}:00` : null,
    });

    if (ok) {
      setIsEditing(false);
    }
  };

  const handleStatusChange = async () => {
    if (!statusDraft || statusDraft === detail.status) {
      return;
    }

    await onChangeStatus(detail.groupBuyId, statusDraft);
  };

  return (
    <div
      className="agb-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="agb-modal"
        role="dialog"
        aria-modal="true"
        aria-label="공동구매 상세 정보"
      >
        <header className="agb-modal-header">
          <div>
            <h2>공동구매 상세 정보</h2>
            {detail && <p>{detail.title}</p>}
          </div>

          <button
            type="button"
            className="agb-modal-close-button"
            onClick={onClose}
            aria-label="닫기"
          >
            ×
          </button>
        </header>

        {isLoading || !detail || !form ? (
          <div className="agb-modal-loading">
            {isLoading ? "불러오는 중입니다..." : "상세 정보가 없습니다."}
          </div>
        ) : (
          <div className="agb-modal-content">
            <section className="agb-modal-product">
              <img
                src={detail.thumbnailUrl || undefined}
                alt={detail.productName}
              />

              <div>
                <strong>{detail.productName}</strong>
                <span>{detail.productNameJp}</span>
                <span>{detail.brand}</span>
                <span>¥{Number(detail.priceJpy ?? 0).toLocaleString()}</span>
              </div>

              <span
                className={`agb-status-badge agb-status-${(detail.status ?? "").toLowerCase()}`}
              >
                {statusText[detail.status] ?? detail.status}
              </span>
            </section>

            <section className="agb-modal-section">
              <h3>등록자 정보</h3>

              <dl className="agb-modal-info-grid">
                <div>
                  <dt>이름</dt>
                  <dd>{detail.creatorName ?? "-"}</dd>
                </div>

                <div>
                  <dt>이메일</dt>
                  <dd>{detail.creatorEmail ?? "-"}</dd>
                </div>

                <div>
                  <dt>참여자 수</dt>
                  <dd>{detail.participantCount ?? 0}명</dd>
                </div>

                <div>
                  <dt>달성률</dt>
                  <dd>
                    {detail.currentQuantity} / {detail.targetQuantity} (
                    {progressRate}%)
                  </dd>
                </div>
              </dl>
            </section>

            <section className="agb-modal-section">
              <div className="agb-modal-section-header">
                <h3>모집 정보</h3>

                {!isEditing && (
                  <button
                    type="button"
                    className="agb-modal-edit-button"
                    onClick={() => setIsEditing(true)}
                  >
                    수정
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="agb-modal-form">
                  <label>
                    <span>제목</span>
                    <input
                      type="text"
                      value={form.title}
                      onChange={handleFormChange("title")}
                    />
                  </label>

                  <label>
                    <span>설명</span>
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={handleFormChange("description")}
                    />
                  </label>

                  <label>
                    <span>목표 수량</span>
                    <input
                      type="number"
                      min={1}
                      value={form.targetQuantity}
                      onChange={handleFormChange("targetQuantity")}
                    />
                  </label>

                  <div className="agb-modal-form-row">
                    <label>
                      <span>시작일시</span>
                      <input
                        type="datetime-local"
                        value={form.startDate}
                        onChange={handleFormChange("startDate")}
                      />
                    </label>

                    <label>
                      <span>종료일시</span>
                      <input
                        type="datetime-local"
                        value={form.endDate}
                        onChange={handleFormChange("endDate")}
                      />
                    </label>
                  </div>

                  <div className="agb-modal-form-actions">
                    <button
                      type="button"
                      className="agb-modal-cancel-button"
                      disabled={isSaving}
                      onClick={() => setIsEditing(false)}
                    >
                      취소
                    </button>

                    <button
                      type="button"
                      className="agb-modal-save-button"
                      disabled={isSaving}
                      onClick={handleSave}
                    >
                      {isSaving ? "저장 중..." : "저장"}
                    </button>
                  </div>
                </div>
              ) : (
                <dl className="agb-modal-info-grid">
                  <div className="agb-modal-info-wide">
                    <dt>설명</dt>
                    <dd>{detail.description || "-"}</dd>
                  </div>

                  <div>
                    <dt>시작일시</dt>
                    <dd>{formatDateTime(detail.startDate)}</dd>
                  </div>

                  <div>
                    <dt>종료일시</dt>
                    <dd>{formatDateTime(detail.endDate)}</dd>
                  </div>

                  <div>
                    <dt>등록일</dt>
                    <dd>{formatDateTime(detail.createdAt)}</dd>
                  </div>

                  <div>
                    <dt>수정일</dt>
                    <dd>{formatDateTime(detail.updatedAt)}</dd>
                  </div>
                </dl>
              )}
            </section>

            <section className="agb-modal-section">
              <h3>진행 상태 변경</h3>

              <div className="agb-modal-status-row">
                <select
                  value={statusDraft}
                  onChange={(event) => setStatusDraft(event.target.value)}
                  disabled={isSaving}
                >
                  <option value="RECRUITING">모집 중</option>
                  <option value="SUCCESS">공동구매 성공</option>
                  <option value="FAILED">모집 실패</option>
                  <option value="CANCELLED">취소</option>
                </select>

                <button
                  type="button"
                  className="agb-modal-save-button"
                  disabled={isSaving || statusDraft === detail.status}
                  onClick={handleStatusChange}
                >
                  변경
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminGroupBuyDetailModal;
