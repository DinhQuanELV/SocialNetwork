import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import UserNotFound from '~/components/User/UserNotFound';

const cx = classNames.bind(styles);

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const { userid } = useParams();

  useEffect(() => {
    fetch(`/user/${userid}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserProfile(result.user);
        setUserPosts(result.posts);
      });
  }, [userid]);

  return (
    <>
      {userProfile ? (
        <div className={cx('wrapper')}>
          <div className={cx('body')}>
            <img
              className={cx('avatar')}
              src="https://lh3.googleusercontent.com/a/ACg8ocLr-WaQOOYYgxufAz56i6lS4c5fEgjmV_zPsfmVuha2wuYxZu3H=s360-c-no"
              alt="avatar"
            />
            <div className={cx('info')}>
              <h4 className={cx('name')}>{userProfile && userProfile.name}</h4>
              <div className={cx('stats')}>
                <span>{userPosts && userPosts.length} posts</span>
                <span>followers</span>
                <span>following</span>
              </div>
            </div>
          </div>
          <div className={cx('posts')}>
            {userProfile &&
              userPosts &&
              userPosts.map((post) => {
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
      ) : (
        <UserNotFound />
      )}
    </>
  );
};

export default UserProfile;
