import classNames from 'classnames/bind';
import styles from './Loader.module.scss';

const cx = classNames.bind(styles);

const Loader = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('loader')}></div>
    </div>
  );
};

export default Loader;
