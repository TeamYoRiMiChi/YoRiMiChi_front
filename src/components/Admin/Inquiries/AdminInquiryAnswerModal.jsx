function AdminInquiryAnswerModal({ inquiry, answerText, answering, formatDate, onAnswerChange, onClose, onSubmit }) {
  if (!inquiry) return null;

  return (
    <div className="ai-modal-backdrop">
      <div className="ai-modal">
        <div className="ai-modal-header">
          <div><span>お問い合わせ #{inquiry.inquiryId}</span><h3>{inquiry.title}</h3></div>
          <button type="button" onClick={onClose}>×</button>
        </div>
        <div className="ai-modal-question">
          <div className="ai-modal-meta">
            <span>{inquiry.memberName}</span><span>{inquiry.email}</span>
            <span>{formatDate(inquiry.createdAt)}</span>
          </div>
          <p>{inquiry.content}</p>
        </div>
        <div className="ai-answer-area">
          <label htmlFor="admin-inquiry-answer">
            {inquiry.status === 'ANSWERED' ? '管理者回答の修正' : '管理者回答'}
          </label>
          <textarea id="admin-inquiry-answer" value={answerText}
            placeholder="会員に送る回答を入力してください。"
            onChange={(event) => onAnswerChange(event.target.value)} />
        </div>
        <div className="ai-modal-actions">
          <button type="button" className="ai-modal-cancel" onClick={onClose}>キャンセル</button>
          <button type="button" className="ai-modal-save" onClick={onSubmit} disabled={answering}>
            {answering ? "保存中..." : inquiry.status === 'ANSWERED' ? '修正を保存' : '回答を保存'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminInquiryAnswerModal;
