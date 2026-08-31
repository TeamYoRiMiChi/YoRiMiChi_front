import '../../assets/styles/Faq/FaqItem.css';
function FaqItem({ question, answer, isOpen, onToggle }) {
 return (
  <div className="faq_item">
    <div className="faq_question">
      <span className="faq_q">Q.</span>

      <span className="faq_question_text">
        {question}
      </span>

      <button
        type="button"
        className="faq_toggle"
        onClick={onToggle}
      >
        {isOpen ? '−' : '+'}
      </button>
    </div>
    <div className={`faq_answer ${isOpen ? 'open' : ''}`}>
        <div className="faq_answer_inner">
            <div className="faq_answer_content">
                <span className="faq_a">A.</span>
                    <p>{answer}</p>
            </div>
        </div>
    </div>

  </div>
);
}

export default FaqItem;