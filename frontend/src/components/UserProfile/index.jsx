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
        console.log('Chưa ẩn password');
        setIsFollow(true);
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem('user', JSON.stringify(data));
        // setUser((prevState) => ({
        //   ...prevState,
        //   followers: [...prevState.followers, data._id],
        // }));
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
        console.log('Chưa ẩn password');
        setIsFollow(false);
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem('user', JSON.stringify(data));
        // setUser((prevState) => ({
        //   ...prevState,
        //   followers: [...prevState.followers, data._id],
        // }));
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
              src="https://lh3.googleusercontent.com/a/ACg8ocLr-WaQOOYYgxufAz56i6lS4c5fEgjmV_zPsfmVuha2wuYxZu3H=s360-c-no"
              alt="avatar"
            />
            <div className={cx('info')}>
              <h4 className={cx('name')}>{user && user.name}</h4>
              {!isFollow ? (
                <button onClick={() => handleFollowUser(user._id)}>
                  Follow
                </button>
              ) : (
                <button onClick={() => handleUnfollowUser(user._id)}>
                  Unfollow
                </button>
              )}
              <div className={cx('stats')}>
                <span>{posts && posts.length} posts</span>
                <span>
                  {user && user.followers ? user.followers.length : 0} followers
                </span>
                <span>
                  {user && user.following ? user.following.length : 0} following
                </span>
              </div>
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
