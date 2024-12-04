import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FcGoogle } from 'react-icons/fc';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import styles from './Signup.module.scss';

const cx = classNames.bind(styles);

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('logo')}>dqelv</h1>
      <button className={cx('google-btn')}>
        <FcGoogle />
        <span>Log in with Google</span>
      </button>
      <span className={cx('login-with')}>Or</span>
      <form className={cx('form')}>
        <input
          className={cx('input')}
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={cx('input')}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={cx('input')}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={cx('password-input')}>
          <input
            className={cx('input')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!!password && (
            <span
              className={cx('toggle-password')}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          )}
        </div>
        <button
          className={cx('signup-btn')}
          type="submit"
          onClick={handleSignup}
        >
          Sign up
        </button>
      </form>
      <p className={cx('login')}>
        Have an account?{' '}
        <Link to="/login" className={cx('login-link')}>
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
