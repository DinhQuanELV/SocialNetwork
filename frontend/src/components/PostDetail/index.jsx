import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { IoIosSend } from 'react-icons/io';

import styles from './PostDetail.module.scss';

const cx = classNames.bind(styles);

const PostDetail = ({ post, setData }) => {
  const [comments, setComments] = useState(post.comments);
  const inputRef = useRef(null);

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
        const updatedPost = result;
        setComments(updatedPost.comments.reverse());
        setData((prevData) =>
          prevData.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
        );
        if (inputRef.current) {
          inputRef.current.value = '';
          inputRef.current.focus();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('comments')}>
        {comments.map((comment) => {
          return (
            <h6 key={comment._id}>
              <span className={cx('name')}>{comment.postedBy.name}</span>
              <span className={cx('comment')}>{comment.text}</span>
            </h6>
          );
        })}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateComment(e.target[0].value, post._id);
        }}
        className={cx('form')}
      >
        <input
          type="text"
          placeholder="Add a comment..."
          className={cx('input')}
          ref={inputRef}
        />
        <button className={cx('btn')} type="submit">
          <IoIosSend className={cx('btn-icon')} />
        </button>
      </form>
    </div>
  );
};

export default PostDetail;
