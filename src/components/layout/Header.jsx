import { Link } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { logout } from '../../features/auth/authSlice'; 
import logo from '../../assets/images/yomi_logo_jp.png'; 
import './Header.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 
 
function Header() { 
  const dispatch = useDispatch(); 
  const accessToken = useSelector((state) => state.auth.accessToken); 
 
  const handleLogout = () => { 
    dispatch(logout()); 
  }; 
 
  return ( 
    <header className="header"> 

      <div className='logo'> 
        <Link to="/">
          <img src={logo} alt="#" />
        </Link> 
      </div> 
 
      <div className='featurs'> 
        <Link to='featurs/' className='featurs_menu'>海外購入</Link> 
        <Link to='featurs/' className='featurs_menu'>共同購入</Link> 
        <Link to='featurs/' className='featurs_menu'>ご利用案内</Link> 
        <Link to='featurs/' className='featurs_menu'>カスタマーセンター</Link> 
      </div> 
 
      <div className='member'> 
 
     <Link to="login/" className='login_bt'>
         번역은어떻게넣는거지..?
        </Link> 
    
        <button className='search_bt'> 
          <FontAwesomeIcon icon={faMagnifyingGlass} /> 
        </button> 
 
        <Link to="login/" className='login_bt'>
          ログイン
        </Link> 

        <Link to="join/" className='join_bt'>
          会員登録
        </Link> 
 
      </div> 
 
    </header> 
  ); 
} 
 
export default Header;