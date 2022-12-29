import './Nav.css';
import UserProfile from '../UserProfile/UserProfile';
import { navigationList } from './navigationList';
import { Link } from 'react-router-dom';
import Logout from '../Logout/Logout';

const Nav = () => {
  return (
    <nav className="nav-divider">
      <ul>
        <li>
          <UserProfile />
        </li>

        {navigationList.map((navigationItem) => (
          <div key={navigationItem.key}>
            <li>
              <Link
                to={navigationItem.toPath}
                disabled={navigationItem.disabled}
              >
                <span>
                  {navigationItem.icon}
                  {navigationItem.label}
                </span>
              </Link>
            </li>
          </div>
        ))}
        
        <li>
          <Logout />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
