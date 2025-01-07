import { useState } from 'react';
import classNames from 'classnames/bind';
import { FaTrash, FaEdit } from 'react-icons/fa';

import styles from './PostMenu.module.scss';
import EditPost from '~/components/Modals/EditPost';
import ConfirmRemovePost from '~/components/Modals/ConfirmRemovePost';

const cx = classNames.bind(styles);

const PostMenu = ({ onDelete, title, postId, onEdit }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);

  const handleClose = () => {
    setShowEdit(false);
    setShowRemove(false);
  };
  const handleShowEdit = () => setShowEdit(true);
  const handleShowRemove = () => setShowRemove(true);

  const handleTitleChange = (value) => setUpdatedTitle(value);

  const handleEditPost = () => {
    console.log(updatedTitle, postId);
    fetch(`/post/edit/${postId}/${updatedTitle}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        onEdit(data);
      });
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('buttons')}>
        <button className={cx('button')} onClick={handleShowEdit}>
          <FaEdit className={cx('icon')} />
          <span>Edit post</span>
        </button>
        <button className={cx('button')} onClick={handleShowRemove}>
          <FaTrash className={cx('icon')} />
          <span>Delete post</span>
        </button>
      </div>
      <EditPost
        onEdit={handleEditPost}
        onChange={handleTitleChange}
        title={updatedTitle}
        show={showEdit}
        handleClose={handleClose}
      />
      <ConfirmRemovePost
        show={showRemove}
        handleClose={handleClose}
        onDelete={onDelete}
      />
    </div>
  );
};

export default PostMenu;
