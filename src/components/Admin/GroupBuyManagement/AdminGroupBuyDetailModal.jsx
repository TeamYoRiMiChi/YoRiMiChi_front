import { useEffect, useState } from "react";

import "../../../pages/Admin/GroupBuyManagement/AdminGroupBuy.css";

const statusText = {
  RECRUITING: "募集中",
  SUCCESS: "共同購入成立",
  FAILED: "募集失敗",
  CANCELLED: "キャンセル",
};

function formatDateTime(dateValue) {
  if (!dateValue) {
    return "-";
  }

  return new Intl.DateTimeFormat("ja-JP", {
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
      alert("タイトルを入力してください。");
      return;
    }

    if (!Number.isFinite(targetQuantity) || targetQuantity < 1) {
      alert("目標数量を正しく入力してください。");
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
        aria-label="共同購入詳細情報"
      >
        <header className="agb-modal-header">
          <div>
            <h2>共同購入詳細情報</h2>
            {detail && <p>{detail.title}</p>}
          </div>

          <button
            type="button"
            className="agb-modal-close-button"
            onClick={onClose}
            aria-label="閉じる"
          >
            ×
          </button>
        </header>

        {isLoading || !detail || !form ? (
          <div className="agb-modal-loading">
            {isLoading ? "読み込み中です..." : "詳細情報がありません。"}
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
              <h3>登録者情報</h3>

              <dl className="agb-modal-info-grid">
                <div>
                  <dt>名前</dt>
                  <dd>{detail.creatorName ?? "-"}</dd>
                </div>

                <div>
                  <dt>メール</dt>
                  <dd>{detail.creatorEmail ?? "-"}</dd>
                </div>

                <div>
                  <dt>参加者数</dt>
                  <dd>{detail.participantCount ?? 0}名</dd>
                </div>

                <div>
                  <dt>達成率</dt>
                  <dd>
                    {detail.currentQuantity} / {detail.targetQuantity} (
                    {progressRate}%)
                  </dd>
                </div>
              </dl>
            </section>

            <section className="agb-modal-section">
              <div className="agb-modal-section-header">
                <h3>募集情報</h3>

                {!isEditing && (
                  <button
                    type="button"
                    className="agb-modal-edit-button"
                    onClick={() => setIsEditing(true)}
                  >
                    編集
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="agb-modal-form">
                  <label>
                    <span>タイトル</span>
                    <input
                      type="text"
                      value={form.title}
                      onChange={handleFormChange("title")}
                    />
                  </label>

                  <label>
                    <span>説明</span>
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={handleFormChange("description")}
                    />
                  </label>

                  <label>
                    <span>目標数量</span>
                    <input
                      type="number"
                      min={1}
                      value={form.targetQuantity}
                      onChange={handleFormChange("targetQuantity")}
                    />
                  </label>

                  <div className="agb-modal-form-row">
                    <label>
                      <span>開始日時</span>
                      <input
                        type="datetime-local"
                        value={form.startDate}
                        onChange={handleFormChange("startDate")}
                      />
                    </label>

                    <label>
                      <span>終了日時</span>
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
                      キャンセル
                    </button>

                    <button
                      type="button"
                      className="agb-modal-save-button"
                      disabled={isSaving}
                      onClick={handleSave}
                    >
                      {isSaving ? "保存中..." : "保存"}
                    </button>
                  </div>
                </div>
              ) : (
                <dl className="agb-modal-info-grid">
                  <div className="agb-modal-info-wide">
                    <dt>説明</dt>
                    <dd>{detail.description || "-"}</dd>
                  </div>

                  <div>
                    <dt>開始日時</dt>
                    <dd>{formatDateTime(detail.startDate)}</dd>
                  </div>

                  <div>
                    <dt>終了日時</dt>
                    <dd>{formatDateTime(detail.endDate)}</dd>
                  </div>

                  <div>
                    <dt>登録日</dt>
                    <dd>{formatDateTime(detail.createdAt)}</dd>
                  </div>

                  <div>
                    <dt>更新日</dt>
                    <dd>{formatDateTime(detail.updatedAt)}</dd>
                  </div>
                </dl>
              )}
            </section>

            <section className="agb-modal-section">
              <h3>進行状況の変更</h3>

              <div className="agb-modal-status-row">
                <select
                  value={statusDraft}
                  onChange={(event) => setStatusDraft(event.target.value)}
                  disabled={isSaving}
                >
                  <option value="RECRUITING">募集中</option>
                  <option value="SUCCESS">共同購入成立</option>
                  <option value="FAILED">募集失敗</option>
                  <option value="CANCELLED">キャンセル</option>
                </select>

                <button
                  type="button"
                  className="agb-modal-save-button"
                  disabled={isSaving || statusDraft === detail.status}
                  onClick={handleStatusChange}
                >
                  変更
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
