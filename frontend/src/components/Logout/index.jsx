import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { IoIosLogOut } from 'react-icons/io';

import styles from './Logout.module.scss';
import { UserContext } from '~/App';

const cx = classNames.bind(styles);

const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: 'CLEAR' });
    navigate('/login');
  };

  return (
    <button className={cx('button')} onClick={handleLogout}>
      <IoIosLogOut className={cx('icon')} />
      <span>Log out</span>
    </button>
  );
};

export default Logout;
