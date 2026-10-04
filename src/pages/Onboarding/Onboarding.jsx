import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faUser } from '@fortawesome/free-solid-svg-icons';
import AuthLayout from '../../components/Auth/AuthLayout';
import JapaneseMobileFields from '../../components/Auth/JapaneseMobileFields';
import { onboardUser, logoutUser } from '../../features/auth/authSlice';
import { toJapaneseMobileNumber } from '../../services/authentication';
import '../../assets/styles/SignUp.css';

function Onboarding() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, attributes, initialized, status, error, user } = useSelector(
    (state) => state.auth,
  );
  const [name, setName] = useState(attributes.name ?? '');
  const [phone, setPhone] = useState(
    toJapaneseMobileNumber(attributes.phone_number),
  );
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
    if (!/^(070|080|090)-\d{4}-\d{4}$/.test(phone.trim())) {
      setValidationError('070・080・090から始まる携帯電話番号を入力してください。');
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

  const handleCancel = async () => {
    await dispatch(logoutUser());
    navigate('/login', { replace: true });
  };

  return (
    <div className="signup-page">
      <AuthLayout description={<>YoRiMiChiで使用する会員情報を入力してください。</>}>
        <section className="signup-content">
          <h2>会員情報登録</h2>
          <p className="form-description">
            認証は完了しました。未入力の会員情報を登録してください。
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

            <div className="form-group">
              <label htmlFor="onboarding-phone-prefix">携帯電話番号</label>
              <JapaneseMobileFields
                idPrefix="onboarding-phone"
                value={phone}
                onChange={setPhone}
                disabled={isLoading}
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
          <button type="button" onClick={handleCancel} disabled={isLoading}>
            キャンセルしてログインに戻る
          </button>
        </section>
      </AuthLayout>
    </div>
  );
}

export default Onboarding;
