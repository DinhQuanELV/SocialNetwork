import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Logout from '~/components/Authentication/Logout';

const cx = classNames.bind(styles);

const Sidebar = () => {
  return (
    <aside className={cx('wrapper')}>
      <Link to="/" className={cx('logo')}>
        dqelv
      </Link>
      <ul>
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
