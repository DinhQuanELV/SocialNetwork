import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { FaRegHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/allpost', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  return (
    <div className={cx('wrapper')}>
      {Array.isArray(data) &&
        data.map((item) => {
          return (
            <div className={cx('post')} key={item._id}>
              <div className={cx('info')}>
                <img
                  className={cx('avatar')}
                  src="https://lh3.googleusercontent.com/a/ACg8ocLr-WaQOOYYgxufAz56i6lS4c5fEgjmV_zPsfmVuha2wuYxZu3H=s360-c-no"
                  alt="avatar"
                />
                <h4 className={cx('name')}>{item.postedBy.name}</h4>
              </div>
              <img className={cx('image')} src={item.image} alt="post" />
              <div className={cx('activity')}>
                <FaRegHeart />
                <span>{item.title}</span>
                <input type="text" placeholder="Add a comment..." />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
