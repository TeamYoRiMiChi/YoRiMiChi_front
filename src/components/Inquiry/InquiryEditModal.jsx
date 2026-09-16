import InquiryForm from './InquiryForm';

function InquiryEditModal({ edit }) {
  if (!edit.selectedInquiry) return null;

  return (
    <div className="inquiry-edit-backdrop" role="presentation">
      <section className="inquiry-edit-modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-edit-title">
        <div className="inquiry-edit-header">
          <div>
            <h2 id="inquiry-edit-title">お問い合わせを修正</h2>
            <p>回答前のお問い合わせのみ修正できます。</p>
          </div>
          <button type="button" onClick={edit.close} disabled={edit.submitting} aria-label="閉じる">×</button>
        </div>
        <InquiryForm
          mode="edit"
          values={edit.values}
          errors={edit.errors}
          notice={edit.notice}
          submitting={edit.submitting}
          onChange={edit.handleChange}
          onSubmit={edit.handleSubmit}
          onCancel={edit.close}
        />
      </section>
    </div>
  );
}

export default InquiryEditModal;
