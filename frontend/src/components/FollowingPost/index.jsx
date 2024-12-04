import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FaRegHeart, FaHeart, FaTrash } from 'react-icons/fa';
import styles from './FollowingPost.module.scss';
import { UserContext } from '~/App';

const cx = classNames.bind(styles);

const FollowingPost = () => {
  const [data, setData] = useState([]);
  const { state } = useContext(UserContext);

  useEffect(() => {
    fetch('/following', {
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

  const handleCreateComment = (text, postId) => {
    fetch('/comment', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        text,
        postId,
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

  const handleDeletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
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
                <h4 className={cx('name')}>
                  <Link
                    to={
                      state && state._id && post.postedBy._id !== state._id
                        ? `/profile/${post.postedBy._id}`
                        : '/profile'
                    }
                  >
                    {post.postedBy.name}
                  </Link>
                </h4>
                {state && state._id && post.postedBy._id === state._id && (
                  <span
                    onClick={() => {
                      handleDeletePost(post._id);
                    }}
                    style={{ marginLeft: 'auto' }}
                  >
                    <FaTrash />
                  </span>
                )}
              </div>
              <img className={cx('image')} src={post.image} alt="post" />
              <div className={cx('activity')}>
                {state && state._id && post.likes.includes(state._id) ? (
                  <span onClick={() => handleUnLikePost(post._id)}>
                    <FaHeart />
                  </span>
                ) : (
                  <span onClick={() => handleLikePost(post._id)}>
                    <FaRegHeart />
                  </span>
                )}
                <span>{post.likes.length} likes</span>
                <span>{post.title}</span>
                <span>
                  {post.comments.map((comment) => {
                    return (
                      <h6 key={comment._id}>
                        <span>{comment.postedBy.name}</span>
                        {comment.text}
                      </h6>
                    );
                  })}
                </span>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateComment(e.target[0].value, post._id);
                  }}
                >
                  <input type="text" placeholder="Add a comment..." />
                </form>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default FollowingPost;
