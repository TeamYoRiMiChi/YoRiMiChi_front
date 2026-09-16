import { Link } from 'react-router-dom';
import InquiryForm from '../../components/Inquiry/InquiryForm';
import useInquiryForm from '../../hooks/Inquiry/useInquiryForm';
import '../../assets/styles/Inquiry/Inquiry.css';

function InquiryCreate() {
  const form = useInquiryForm();

  return (
    <div className="inquiry-page">
      <section className="inquiry-heading">
        <p className="inquiry-eyebrow">CUSTOMER SUPPORT</p>
        <h1>1:1お問い合わせ</h1>
        <p>
          ご質問やお困りの内容をご記入ください。
          担当者が確認後、順次回答いたします。
        </p>
        <Link to="/support/inquiries" className="inquiry-history-link">
          お問い合わせ履歴を見る
        </Link>
      </section>

      <section className="inquiry-panel">
        <nav className="inquiry-breadcrumb" aria-label="パンくずリスト">
          <Link to="/">ホーム</Link>
          <span>›</span>
          <Link to="/support">カスタマーサポート</Link>
          <span>›</span>
          <strong>1:1お問い合わせ</strong>
        </nav>
        <div className="inquiry-guide">
          <h2>お問い合わせ内容</h2>
          <p><span>*</span> は必須項目です。</p>
        </div>
        <InquiryForm
          values={form.values}
          errors={form.errors}
          notice={form.notice}
          submitting={form.submitting}
          onChange={form.handleChange}
          onSubmit={form.handleSubmit}
        />
      </section>
    </div>
  );
}

export default InquiryCreate;
