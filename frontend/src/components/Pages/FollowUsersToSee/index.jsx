import classNames from 'classnames/bind';
import styles from './FollowUsersToSee.module.scss';

const cx = classNames.bind(styles);

const FollowUsersToSee = () => {
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx()}>You are not following anyone </h2>
      <h2 className={cx()}>Follow more users to see their photos</h2>
    </div>
  );
};

export default FollowUsersToSee;
