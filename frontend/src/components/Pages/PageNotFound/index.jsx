import classNames from 'classnames/bind';
import styles from './PageNotFound.module.scss';

const cx = classNames.bind(styles);

const PageNotFound = () => {
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx()}>Page Not Found</h2>
    </div>
  );
};

export default PageNotFound;
