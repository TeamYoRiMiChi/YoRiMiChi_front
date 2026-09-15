import { useState } from 'react';

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
  const [values, setValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setNotice('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setNotice('お問い合わせ登録APIは準備中です。入力内容はまだ保存されていません。');
  };

  return {
    values,
    errors,
    notice,
    handleChange,
    handleSubmit,
  };
}

export default useInquiryForm;
