import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const Profile = () => {
  const [myPost, setMyPost] = useState([]);

  useEffect(() => {
    fetch('/mypost', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMyPost(result.myPost);
      });
  }, []);

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
        {myPost.map((post) => {
          return (
            <img
              className={cx('post')}
              src={post.image}
              alt={post.title}
              key={post._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
