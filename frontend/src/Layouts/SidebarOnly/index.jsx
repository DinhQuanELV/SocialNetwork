import classNames from 'classnames/bind';

import styles from './SidebarOnly.module.scss';
import Sidebar from '~/Layouts/components/Sidebar';

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  return (
    <div className={cx('wrapper')}>
      <Sidebar />
      <div className={cx('content')}>{children}</div>
    </div>
  );
};

export default DefaultLayout;
