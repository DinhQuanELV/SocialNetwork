import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { CiImageOn, CiImageOff } from 'react-icons/ci';
import { Button, Modal } from 'react-bootstrap';

import styles from './AvatarMenu.module.scss';
import { UserContext } from '~/App';

const cx = classNames.bind(styles);

const AvatarMenu = () => {
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState('');
  const [show, setShow] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isRemove) {
      handleUpdateAvatar();
      setIsRemove(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  const handleUpdateAvatar = () => {
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
          fetch('/user/updateAvatar', {
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

    handleClose();
  };

  const handleRemoveAvatar = () => {
    const defaultAvatar =
      'https://res.cloudinary.com/dqelv/image/upload/v1733063805/DefaultAvatar_nd8ddn.png';
    setImage(defaultAvatar);
    setIsRemove(true);
  };

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setImage(file);
    } else {
      setImage(null);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('buttons')}>
        <button className={cx('button')} onClick={handleShow}>
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
      </div>

      <Modal show={show} onHide={handleClose} data-bs-theme="dark" centered>
        <Modal.Header closeButton>
          <Modal.Title>Change avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className={cx('upload-file')}
            type="file"
            onChange={handlePreviewImage}
          />
          {image && (
            <img
              className={cx('img-preview')}
              src={image.preview}
              alt="preview"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateAvatar}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AvatarMenu;
