import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Login = () => {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('logo')}>dqelv</h1>
      <form className={cx('form')}>
        <input
          className={cx('input')}
          type="email"
          placeholder="Email address"
        />
        <input className={cx('input')} type="password" placeholder="Password" />
        <button className={cx('btn')}>Log in</button>
      </form>
      <p className={cx('signup')}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
