import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

const Profile = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('body')}>
        <img
          className={cx('avatar')}
          src="https://lh3.googleusercontent.com/a/ACg8ocLr-WaQOOYYgxufAz56i6lS4c5fEgjmV_zPsfmVuha2wuYxZu3H=s360-c-no"
          alt="avatar"
        />
        <div className={cx('info')}>
          <h4 className={cx('name')}>Dinh Quan</h4>
          <div className={cx('stats')}>
            <span>posts</span>
            <span>followers</span>
            <span>following</span>
          </div>
        </div>
      </div>
      <div className={cx('posts')}>
        <img
          className={cx('post')}
          src="https://lh3.googleusercontent.com/a/ACg8ocLr-WaQOOYYgxufAz56i6lS4c5fEgjmV_zPsfmVuha2wuYxZu3H=s360-c-no"
          alt="post"
        />
        <img
          className={cx('post')}
          src="https://lh3.googleusercontent.com/a/ACg8ocLr-WaQOOYYgxufAz56i6lS4c5fEgjmV_zPsfmVuha2wuYxZu3H=s360-c-no"
          alt="post"
        />
        <img
          className={cx('post')}
          src="https://lh3.googleusercontent.com/a/ACg8ocLr-WaQOOYYgxufAz56i6lS4c5fEgjmV_zPsfmVuha2wuYxZu3H=s360-c-no"
          alt="post"
        />
        <img
          className={cx('post')}
          src="https://lh3.googleusercontent.com/a/ACg8ocLr-WaQOOYYgxufAz56i6lS4c5fEgjmV_zPsfmVuha2wuYxZu3H=s360-c-no"
          alt="post"
        />
        <img
          className={cx('post')}
          src="https://lh3.googleusercontent.com/a/ACg8ocLr-WaQOOYYgxufAz56i6lS4c5fEgjmV_zPsfmVuha2wuYxZu3H=s360-c-no"
          alt="post"
        />
      </div>
    </div>
  );
};

export default Profile;
