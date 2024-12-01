import { useContext, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { UserContext } from '~/App';
import ChangeAvatar from '~/components/Popovers/ChangeAvatar';

const cx = classNames.bind(styles);

const Profile = () => {
  const { state } = useContext(UserContext);
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
        <div>
          <Tippy
            hideOnClick
            trigger="click"
            interactive
            placement="bottom"
            render={(attrs) => (
              <div className={cx('avatar-option')} tabIndex="-1" {...attrs}>
                <ChangeAvatar />
              </div>
            )}
          >
            <img
              className={cx('avatar')}
              src={state && state.avatar && state.avatar}
              alt="avatar"
            />
          </Tippy>
        </div>

        <div className={cx('info')}>
          <h4 className={cx('name')}>{state && state.name}</h4>
          <div className={cx('stats')}>
            <span>{myPost.length} posts</span>
            <span>
              {state && state.followers ? state.followers.length : 0} followers
            </span>
            <span>
              {state && state.following ? state.following.length : 0} following
            </span>
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
