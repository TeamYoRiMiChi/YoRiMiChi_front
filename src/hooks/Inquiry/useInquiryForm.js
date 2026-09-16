import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInquiry } from '../../api/inquiryApi';

const INITIAL_FORM = {
  category: '',
  title: '',
  content: '',
};

function validate(values) {
  const errors = {};

  if (!values.category) {
    errors.category = 'お問い合わせの種類を選択してください。';
  }
  if (!values.title.trim()) {
    errors.title = '件名を入力してください。';
  }
  if (!values.content.trim()) {
    errors.content = 'お問い合わせ内容を入力してください。';
  }

  return errors;
}

function useInquiryForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setNotice('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setNotice('');

    try {
      const response = await createInquiry({
        category: values.category,
        title: values.title.trim(),
        content: values.content.trim(),
      });

      alert(response.data.message ?? 'お問い合わせを受け付けました。');
      navigate('/support');
    } catch (error) {
      setNotice(
        error.response?.data?.message ??
          'お問い合わせの送信に失敗しました。もう一度お試しください。',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return {
    values,
    errors,
    notice,
    submitting,
    handleChange,
    handleSubmit,
  };
}

export default useInquiryForm;
