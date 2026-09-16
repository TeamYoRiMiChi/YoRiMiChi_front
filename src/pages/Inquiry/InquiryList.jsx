import { Link } from 'react-router-dom';
import useMyInquiries from '../../hooks/Inquiry/useMyInquiries';
import '../../assets/styles/Inquiry/Inquiry.css';

const CATEGORY_LABELS = {
  ORDER: '注文・決済',
  DELIVERY: '配送',
  PRODUCT: '商品',
  GROUP_BUY: '共同購入',
  ETC: 'その他',
};

const STATUS_LABELS = {
  WAITING: '回答待ち',
  ANSWERED: '回答完了',
};

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function InquiryList() {
  const { inquiries, loading, error } = useMyInquiries();

  return (
    <div className="inquiry-page">
      <section className="inquiry-heading inquiry-history-heading">
        <p className="inquiry-eyebrow">CUSTOMER SUPPORT</p>
        <h1>お問い合わせ履歴</h1>
        <p>送信したお問い合わせと回答状況をご確認いただけます。</p>
        <Link to="/support/inquiry" className="inquiry-new-link">
          新しいお問い合わせ
        </Link>
      </section>

      <section className="inquiry-panel">
        <nav className="inquiry-breadcrumb" aria-label="パンくずリスト">
          <Link to="/">ホーム</Link>
          <span>›</span>
          <Link to="/support">カスタマーサポート</Link>
          <span>›</span>
          <strong>お問い合わせ履歴</strong>
        </nav>

        {loading && <p className="inquiry-history-message">読み込み中...</p>}
        {error && <p className="inquiry-history-message inquiry-error">{error}</p>}
        {!loading && !error && inquiries.length === 0 && (
          <p className="inquiry-history-message">お問い合わせ履歴はありません。</p>
        )}

        <div className="inquiry-history-list">
          {inquiries.map((inquiry) => (
            <article className="inquiry-history-card" key={inquiry.inquiryId}>
              <div className="inquiry-history-card-head">
                <div>
                  <span className="inquiry-history-category">
                    {CATEGORY_LABELS[inquiry.category] ?? inquiry.category}
                  </span>
                  <h2>{inquiry.title}</h2>
                </div>
                <span className={`inquiry-history-status ${inquiry.status?.toLowerCase()}`}>
                  {STATUS_LABELS[inquiry.status] ?? inquiry.status}
                </span>
              </div>
              <p className="inquiry-history-date">{formatDate(inquiry.createdAt)}</p>
              <p className="inquiry-history-content">{inquiry.content}</p>
              <div className="inquiry-history-answer">
                <strong>回答</strong>
                <p>{inquiry.answer || '担当者が確認中です。しばらくお待ちください。'}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default InquiryList;
