import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const postData = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('logo')}>dqelv</h1>
      <form className={cx('form')}>
        <input
          className={cx('input')}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={cx('input')}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={cx('btn')} type="submit" onClick={postData}>
          Log in
        </button>
      </form>
      <p className={cx('signup')}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
