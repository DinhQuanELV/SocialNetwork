import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '~/App';

const cx = classNames.bind(styles);

const Post = () => {
  const [data, setData] = useState([]);
  const { state } = useContext(UserContext);

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

  const handleLikePost = (id) => {
    fetch('/like', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const handleUnLikePost = (id) => {
    fetch('/unlike', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={cx('wrapper')}>
      {Array.isArray(data) &&
        data.map((post) => {
          return (
            <div className={cx('post')} key={post._id}>
              <div className={cx('info')}>
                <img
                  className={cx('avatar')}
                  src="https://lh3.googleusercontent.com/a/ACg8ocLr-WaQOOYYgxufAz56i6lS4c5fEgjmV_zPsfmVuha2wuYxZu3H=s360-c-no"
                  alt="avatar"
                />
                <h4 className={cx('name')}>{post.postedBy.name}</h4>
              </div>
              <img className={cx('image')} src={post.image} alt="post" />
              <div className={cx('activity')}>
                {state && state._id && post.likes.includes(state._id) ? (
                  <span
                    onClick={() => {
                      handleUnLikePost(post._id);
                    }}
                  >
                    <FaHeart />
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      handleLikePost(post._id);
                    }}
                  >
                    <FaRegHeart />
                  </span>
                )}
                <span>{post.likes.length} likes</span>
                <span>{post.title}</span>
                <input type="text" placeholder="Add a comment..." />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Post;
