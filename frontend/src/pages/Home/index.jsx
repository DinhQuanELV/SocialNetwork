import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { FaRegHeart } from 'react-icons/fa';

const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('info')}>
        <img
          className={cx('avatar')}
          src="https://lh3.googleusercontent.com/a/ACg8ocLr-WaQOOYYgxufAz56i6lS4c5fEgjmV_zPsfmVuha2wuYxZu3H=s360-c-no"
          alt="avatar"
        />
        <h4 className={cx('name')}>Dinh Quan</h4>
      </div>
      <img
        className={cx('image')}
        src="https://lh3.googleusercontent.com/a/ACg8ocLr-WaQOOYYgxufAz56i6lS4c5fEgjmV_zPsfmVuha2wuYxZu3H=s360-c-no"
        alt="post"
      />
      <div className={cx('activity')}>
        <FaRegHeart />
        <span>title</span>
        <input type="text" placeholder="Add a comment..." />
      </div>
    </div>
  );
};

export default Home;
