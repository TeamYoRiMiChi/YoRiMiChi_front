import { useState } from 'react';
import { updateMyInquiry } from '../../api/inquiryApi';

function validate(values) {
  const errors = {};
  if (!values.category) errors.category = 'お問い合わせの種類を選択してください。';
  if (!values.title.trim()) errors.title = '件名を入力してください。';
  if (!values.content.trim()) errors.content = 'お問い合わせ内容を入力してください。';
  return errors;
}

function useInquiryEdit(onSaved) {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [values, setValues] = useState({ category: '', title: '', content: '' });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const open = (inquiry) => {
    if (inquiry.status !== 'WAITING' || inquiry.answer) return;
    setSelectedInquiry(inquiry);
    setValues({ category: inquiry.category, title: inquiry.title, content: inquiry.content });
    setErrors({});
    setNotice('');
  };
  const close = () => {
    if (!submitting) setSelectedInquiry(null);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setNotice('');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedInquiry || submitting) return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const request = {
      category: values.category,
      title: values.title.trim(),
      content: values.content.trim(),
    };
    if (request.category === selectedInquiry.category
        && request.title === selectedInquiry.title
        && request.content === selectedInquiry.content) {
      setNotice('修正内容がありません。');
      return;
    }

    setSubmitting(true);
    try {
      await updateMyInquiry(selectedInquiry.inquiryId, request);
      setSelectedInquiry(null);
      onSaved();
      alert('お問い合わせを修正しました。');
    } catch (error) {
      setNotice(error.response?.data?.message ?? 'お問い合わせの修正に失敗しました。');
      if (error.response?.status === 409) onSaved();
    } finally {
      setSubmitting(false);
    }
  };

  return { selectedInquiry, values, errors, notice, submitting, open, close, handleChange, handleSubmit };
}

export default useInquiryEdit;
