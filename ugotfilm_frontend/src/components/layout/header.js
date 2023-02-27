import { NavLink } from 'react-router-dom';
import './layout.css';

const Header = () => {
  return (
    <div className="header">
      {localStorage.getItem('username') !== null ? (
        <div>
          <ul className="header_list">
            <li>
              <NavLink to="/logout">
                <span className="menu_name">logout</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/mypage">
                <span className="menu_name">my page</span>
              </NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <ul className="header_list">
            <li>
              <NavLink to="/login">
                <span className="menu_name">login</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/join">
                <span className="menu_name">join</span>
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      <div className="logo_box">
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <span className="logo_name">U Got Film</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
