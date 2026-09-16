import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const CATEGORY_OPTIONS = [
  { value: 'ORDER', label: '注文・決済' },
  { value: 'DELIVERY', label: '配送' },
  { value: 'PRODUCT', label: '商品' },
  { value: 'GROUP_BUY', label: '共同購入' },
  { value: 'ETC', label: 'その他' },
];

function InquiryForm({ values, errors, notice, submitting, onChange, onSubmit, mode = 'create', onCancel }) {
  return (
    <form className="inquiry-form" onSubmit={onSubmit} noValidate>
      <div className="inquiry-field">
        <label htmlFor="inquiry-category">
          お問い合わせの種類 <span>*</span>
        </label>
        <select
          id="inquiry-category"
          name="category"
          value={values.category}
          onChange={onChange}
          aria-invalid={Boolean(errors.category)}
        >
          <option value="">選択してください</option>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.category && <p className="inquiry-error">{errors.category}</p>}
      </div>

      <div className="inquiry-field">
        <label htmlFor="inquiry-title">
          件名 <span>*</span>
        </label>
        <input
          id="inquiry-title"
          name="title"
          type="text"
          maxLength={100}
          value={values.title}
          onChange={onChange}
          placeholder="お問い合わせの件名を入力してください"
          aria-invalid={Boolean(errors.title)}
        />
        <div className="inquiry-field-meta">
          {errors.title ? <p className="inquiry-error">{errors.title}</p> : <span />}
          <span>{values.title.length} / 100</span>
        </div>
      </div>

      <div className="inquiry-field">
        <label htmlFor="inquiry-content">
          お問い合わせ内容 <span>*</span>
        </label>
        <textarea
          id="inquiry-content"
          name="content"
          rows={10}
          maxLength={1000}
          value={values.content}
          onChange={onChange}
          placeholder="できるだけ詳しくご記入ください"
          aria-invalid={Boolean(errors.content)}
        />
        <div className="inquiry-field-meta">
          {errors.content ? <p className="inquiry-error">{errors.content}</p> : <span />}
          <span>{values.content.length} / 1000</span>
        </div>
      </div>

      {notice && <p className="inquiry-notice" role="status">{notice}</p>}

      <div className="inquiry-actions">
        {mode === 'edit' ? (
          <button type="button" className="inquiry-back-button" onClick={onCancel} disabled={submitting}>
            キャンセル
          </button>
        ) : (
          <Link to="/support" className="inquiry-back-button">
            <FontAwesomeIcon icon={faArrowLeft} />
            戻る
          </Link>
        )}
        <button type="submit" className="inquiry-submit-button" disabled={submitting}>
          <FontAwesomeIcon icon={faPaperPlane} />
          {submitting ? '保存中...' : mode === 'edit' ? '修正を保存' : 'お問い合わせを送信'}
        </button>
      </div>
    </form>
  );
}

export default InquiryForm;
