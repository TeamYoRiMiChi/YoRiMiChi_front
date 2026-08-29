import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <button className="btn btn-primary mt-md" onClick={() => navigate('/login')}>
        로그인 테스트
      </button>
    </div>
  );
}


export default Home;