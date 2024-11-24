import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';

const cx = classNames.bind(styles);

const CreatePost = () => {
  return (
    <div className={cx('wrapper')}>
      <input type="text" placeholder="title" />
      <div className={cx('btn')}>
        <span>Select from computer</span>
        <input type="file" />
      </div>
      <button>Share</button>
    </div>
  );
};

export default CreatePost;
