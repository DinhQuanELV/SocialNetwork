import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Logout from '~/components/Authentication/Logout';
import Search from '~/components/Search';

const cx = classNames.bind(styles);

const Sidebar = () => {
  return (
    <aside className={cx('wrapper')}>
      <Link to="/" className={cx('logo')}>
        dqelv
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Search />
        </li>
        <li>
          <Link to="/createpost">Create Post</Link>
        </li>
        <li>
          <Link to="/following">Following</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>

        <li>
          <Logout />
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
