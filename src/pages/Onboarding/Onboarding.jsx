import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import AuthLayout from '../../components/Auth/AuthLayout';
import { onboardUser } from '../../features/auth/authSlice';
import '../../assets/styles/SignUp.css';

function Onboarding() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, attributes, initialized, status, error, user } = useSelector(
    (state) => state.auth,
  );
  const [name, setName] = useState(attributes.name ?? '');
  const [phone, setPhone] = useState('');
  const [validationError, setValidationError] = useState(null);

  useEffect(() => {
    if (initialized && !accessToken) {
      navigate('/login', { replace: true });
    } else if (user) {
      navigate('/', { replace: true });
    }
  }, [accessToken, initialized, navigate, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setValidationError('お名前を入力してください。');
      return;
    }
    if (!/^\d{2,3}-\d{4}-\d{4}$/.test(phone.trim())) {
      setValidationError('電話番号はハイフンを含めて入力してください。');
      return;
    }

    setValidationError(null);
    const result = await dispatch(onboardUser({
      name: name.trim(),
      phone: phone.trim(),
    }));

    if (onboardUser.fulfilled.match(result)) {
      navigate('/', { replace: true });
    }
  };

  const isLoading = status === 'loading';

  return (
    <div className="signup-page">
      <AuthLayout description={<>YoRiMiChiで使用する会員情報を入力してください。</>}>
        <section className="signup-content">
          <h2>会員情報登録</h2>
          <p className="form-description">
            Google認証は完了しました。あと少しで登録完了です。
          </p>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group-with-icon">
              <label htmlFor="onboarding-name">お名前</label>
              <FontAwesomeIcon icon={faUser} />
              <input
                id="onboarding-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-group-with-icon">
              <label htmlFor="onboarding-phone">電話番号</label>
              <FontAwesomeIcon icon={faPhone} />
              <input
                id="onboarding-phone"
                type="tel"
                placeholder="例）080-1234-5678"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {(validationError || error) && (
              <p className="signup-error" role="alert">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {validationError ?? error}
              </p>
            )}

            <button className="signup-submit" type="submit" disabled={isLoading}>
              {isLoading ? '登録中...' : '登録を完了'}
            </button>
          </form>
        </section>
      </AuthLayout>
    </div>
  );
}

export default Onboarding;
