import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { CiImageOn, CiImageOff } from 'react-icons/ci';
import styles from './ChangeAvatar.module.scss';
import { UserContext } from '~/App';

const cx = classNames.bind(styles);

const ChangeAvatar = () => {
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'SocialMedia');
      data.append('cloud_name', 'dqelv');
      fetch('https://api.cloudinary.com/v1_1/dqelv/image/upload', {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch('/updateAvatar', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
              avatar: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                'user',
                JSON.stringify({ ...state, avatar: result.avatar }),
                dispatch({ type: 'UPDATE_AVATAR', payload: result.avatar }),
              );
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const handleChangeAvatar = (file) => {
    setImage(file);
  };

  const handleRemoveAvatar = () => {
    console.log('remove');
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('buttons')}>
        <button className={cx('button')}>
          <span className={cx('icon')}>
            <CiImageOn />
          </span>
          <span className={cx('text')}>Change avatar</span>
        </button>
        <button className={cx('button')} onClick={handleRemoveAvatar}>
          <span className={cx('icon')}>
            <CiImageOff />
          </span>
          <span className={cx('text')}>Remove avatar</span>
        </button>
        <div>
          <input
            type="file"
            onChange={(e) => handleChangeAvatar(e.target.files[0])}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangeAvatar;
