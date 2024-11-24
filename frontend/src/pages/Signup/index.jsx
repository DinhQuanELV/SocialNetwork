import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Signup = () => {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('logo')}>dqelv</h1>
      <form className={cx('form')}>
        <input className={cx('input')} type="text" placeholder="Full name" />
        <input
          className={cx('input')}
          type="email"
          placeholder="Email address"
        />
        <input className={cx('input')} type="password" placeholder="Password" />
        <button className={cx('btn')}>Log in</button>
      </form>
      <p className={cx('login')}>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
