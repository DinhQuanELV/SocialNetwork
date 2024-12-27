import classNames from 'classnames/bind';
import { FaTrash, FaEdit } from 'react-icons/fa';

import styles from './PostMenu.module.scss';

const cx = classNames.bind(styles);

const PostMenu = () => {
  // const handleDeletePost = (postId) => {
  //   fetch(`/deletepost/${postId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: 'Bearer ' + localStorage.getItem('jwt'),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       const newData = data.filter((item) => {
  //         return item._id !== result._id;
  //       });
  //       setData(newData);
  //     });
  // };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('buttons')}>
        <button className={cx('button')}>
          <FaEdit className={cx('icon')} />
          <span>Edit post</span>
        </button>
        <button className={cx('button')}>
          <FaTrash className={cx('icon')} />
          <span>Delete post</span>
        </button>
      </div>
    </div>
  );
};

export default PostMenu;
