import classNames from 'classnames/bind';
import styles from './UserNotFound.module.scss';

const cx = classNames.bind(styles);

const UserNotFound = () => {
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx()}>User Not Found</h2>
    </div>
  );
};

export default UserNotFound;
