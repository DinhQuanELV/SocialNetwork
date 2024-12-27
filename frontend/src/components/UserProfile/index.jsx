import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { UserContext } from '~/App';
import Loader from '~/components/Animations/Loader';

const cx = classNames.bind(styles);

const UserProfile = () => {
  const { userid } = useParams();
  const { dispatch } = useContext(UserContext);
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    fetch(`/user/${userid}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result.user);
        setPosts(result.posts);
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem('user'))._id,
          )
        ) {
          setIsFollow(true);
        }
      });
  }, [userid, isFollow]);

  const handleFollowUser = (userid) => {
    fetch('/follow', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFollow(true);
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem('user', JSON.stringify(data));
      });
  };

  const handleUnfollowUser = (userid) => {
    fetch('/unfollow', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsFollow(false);
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem('user', JSON.stringify(data));
      });
  };

  return (
    <>
      {!user ? (
        <Loader />
      ) : (
        <div className={cx('wrapper')}>
          <div className={cx('body')}>
            <img
              className={cx('avatar')}
              src={user && user.avatar}
              alt="avatar"
            />
            <div className={cx('info')}>
              <div className={cx('activity-user')}>
                <h4 className={cx('username')}>{user && user.name}</h4>
                {!isFollow ? (
                  <button
                    className={cx('follow-btn')}
                    onClick={() => handleFollowUser(user._id)}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    className={cx('unfollow-btn')}
                    onClick={() => handleUnfollowUser(user._id)}
                  >
                    Unfollow
                  </button>
                )}
              </div>
              <div className={cx('stats')}>
                <span>{posts && posts.length} posts</span>
                <span>
                  {user && user.followers ? user.followers.length : 0} followers
                </span>
                <span>
                  {user && user.following ? user.following.length : 0} following
                </span>
              </div>
              <h4 className={cx('name')}>{user && user.name}</h4>
              <p className={cx('bio')}></p>
            </div>
          </div>
          <div className={cx('posts')}>
            {user &&
              posts &&
              posts.map((post) => {
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
      )}
    </>
  );
};

export default UserProfile;
