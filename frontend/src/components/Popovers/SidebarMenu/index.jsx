import classNames from 'classnames/bind';
import { PiMoonLight } from 'react-icons/pi';

import styles from './SidebarMenu.module.scss';
import Logout from '~/components/Logout';

const cx = classNames.bind(styles);

const SidebarMenu = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('buttons')}>
        <button className={cx('button')}>
          <PiMoonLight className={cx('icon')} />
          <span>Switch appearance</span>
        </button>
        <Logout />
      </div>
    </div>
  );
};

export default SidebarMenu;
