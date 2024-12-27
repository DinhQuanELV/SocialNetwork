import { forwardRef, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import Tippy from '@tippyjs/react/headless';

import styles from './Post.module.scss';
import { UserContext } from '~/App';
import PostDetail from '~/components/PostDetail';
import PostMenu from '~/components/Popovers/PostMenu';

const cx = classNames.bind(styles);

const PostMenuBtn = forwardRef((props, ref) => {
  return (
    <button ref={ref} className={cx('menu-btn')} {...props}>
      <BsThreeDots className={cx('menu-icon')} />
    </button>
  );
});

const Post = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [visibleMenuPostId, setVisibleMenuPostId] = useState(null);

  const { state } = useContext(UserContext);

  const handleClose = () => setShow(false);
  const handleShow = (post) => {
    const orderedPost = { ...post, comments: post.comments.reverse() };
    setSelectedPost(orderedPost);
    setShow(true);
  };

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
            <div className={cx('post')} key={post && post._id && post._id}>
              <div className={cx('info')}>
                <h4 className={cx('name')}>
                  <Link
                    className={cx('name-link')}
                    to={
                      state && state._id && post.postedBy._id !== state._id
                        ? `/profile/${post.postedBy._id}`
                        : '/profile'
                    }
                  >
                    <img
                      className={cx('avatar')}
                      src={state && state.avatar && state.avatar}
                      alt="avatar"
                    />
                    {post.postedBy.name}
                  </Link>
                </h4>
                {state && state._id && post.postedBy._id === state._id && (
                  <div className={cx('menu')}>
                    <Tippy
                      visible={visibleMenuPostId === post._id}
                      onClickOutside={() => setVisibleMenuPostId(null)}
                      interactive
                      placement="bottom"
                      render={(attrs) => (
                        <div
                          className={cx('avatar-option')}
                          tabIndex="-1"
                          {...attrs}
                          onClick={() => setVisibleMenuPostId(null)}
                        >
                          <PostMenu />
                        </div>
                      )}
                    >
                      <PostMenuBtn
                        onClick={() => {
                          setVisibleMenuPostId(
                            visibleMenuPostId === post._id ? null : post._id,
                          );
                        }}
                      />
                    </Tippy>
                  </div>
                )}
              </div>
              <img className={cx('image')} src={post.image} alt="post" />
              <div className={cx('activity')}>
                <div>
                  {state && state._id && post.likes.includes(state._id) ? (
                    <span onClick={() => handleUnLikePost(post._id)}>
                      <FaHeart className={cx('like-icon-active')} />
                    </span>
                  ) : (
                    <span onClick={() => handleLikePost(post._id)}>
                      <FaRegHeart className={cx('like-icon')} />
                    </span>
                  )}
                  <FaRegComment
                    className={cx('comment-icon')}
                    onClick={() => handleShow(post)}
                  />
                </div>
                <span className={cx('likes')}>{post.likes.length} likes</span>
                <span className={cx('caption')}>{post.title}</span>
              </div>
            </div>
          );
        })}
      <Modal show={show} onHide={handleClose} centered data-bs-theme="dark">
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost && <PostDetail post={selectedPost} setData={setData} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Post;
