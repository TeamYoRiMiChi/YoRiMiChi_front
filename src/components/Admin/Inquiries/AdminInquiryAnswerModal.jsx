function AdminInquiryAnswerModal({ inquiry, answerText, answering, formatDate, onAnswerChange, onClose, onSubmit }) {
  if (!inquiry) return null;

  return (
    <div className="ai-modal-backdrop">
      <div className="ai-modal">
        <div className="ai-modal-header">
          <div><span>문의 #{inquiry.inquiryId}</span><h3>{inquiry.title}</h3></div>
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
          <label htmlFor="admin-inquiry-answer">관리자 답변</label>
          <textarea id="admin-inquiry-answer" value={answerText}
            placeholder="회원에게 전달할 답변을 입력해주세요."
            onChange={(event) => onAnswerChange(event.target.value)} />
        </div>
        <div className="ai-modal-actions">
          <button type="button" className="ai-modal-cancel" onClick={onClose}>취소</button>
          <button type="button" className="ai-modal-save" onClick={onSubmit} disabled={answering}>
            {answering ? "저장 중..." : "답변 저장"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminInquiryAnswerModal;
