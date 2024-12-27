import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { UserContext } from '~/App';
import styles from './Profile.module.scss';
import AvatarMenu from '~/components/Popovers/AvatarMenu';

const cx = classNames.bind(styles);

const Profile = () => {
  const { state } = useContext(UserContext);
  const [myPost, setMyPost] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('/myPost', {
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
            visible={isVisible}
            onClickOutside={() => setIsVisible(false)}
            interactive
            placement="bottom"
            render={(attrs) => (
              <div
                className={cx('avatar-option')}
                tabIndex="-1"
                {...attrs}
                onClick={() => setIsVisible(false)}
              >
                <AvatarMenu />
              </div>
            )}
          >
            <img
              className={cx('avatar')}
              src={state && state.avatar && state.avatar}
              alt="avatar"
              onClick={() => setIsVisible(!isVisible)}
            />
          </Tippy>
        </div>

        <div className={cx('info')}>
          <h4 className={cx('username')}>
            {state && state.username && state.username}
          </h4>

          <div className={cx('stats')}>
            <span>{myPost.length} posts</span>
            <span>
              {state && state.followers ? state.followers.length : 0} followers
            </span>
            <span>
              {state && state.following ? state.following.length : 0} following
            </span>
          </div>
          <h4 className={cx('name')}>{state && state.name && state.name}</h4>
          <p className={cx('bio')}>{state && state.bio && state.bio}</p>
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
