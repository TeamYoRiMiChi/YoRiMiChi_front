import { useState } from 'react';
import { login } from '../api/userApi';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });
      console.log(res.data.data);

    } catch (err) {
      console.error(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card w-full">
        <h2 className="mb-md">로그인</h2>

        <input
          className="input mb-sm"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input mb-md"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-primary w-full">로그인</button>
      </div>
    </form>
  );
}

export default Login;