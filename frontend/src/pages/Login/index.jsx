import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import styles from './Login.module.scss';
import { UserContext } from '~/App';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const Login = () => {
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
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
        if (data.error) {
          alert(data.error);
        } else {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch({ type: 'USER', payload: data.user });
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTogglePassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <Container fluid className={cx('wrapper')}>
      <Row>
        <Col
          xs={0}
          sm={0}
          md={0}
          lg={0}
          xl={7}
          xxl={8}
          className="d-none d-sm-none d-md-none d-lg-none d-xl-flex d-xxl-flex"
        >
          <img src={images.authBG} alt="" className={cx('image')} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} xl={5} xxl={4}>
          <div className={cx('content')}>
            <h1 className={cx('logo')}>dqelv</h1>
            <form className={cx('form')}>
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
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                )}
              </div>
              <button
                className={cx('login-btn')}
                type="submit"
                onClick={handleLogin}
              >
                Log in
              </button>
            </form>
            <span className={cx('login-with')}>Or</span>
            <button className={cx('google-btn')}>
              <FcGoogle />
              <span>Log in with Google</span>
            </button>
            <Link to="/forgot-password" className={cx('forgot-password')}>
              Forgot Password?
            </Link>
            <span className={cx('signup')}>
              Don't have an account?{' '}
              <Link to="/signup" className={cx('signup-link')}>
                Sign up now
              </Link>
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
