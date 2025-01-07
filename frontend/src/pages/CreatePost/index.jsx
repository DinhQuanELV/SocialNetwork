import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './CreatePost.module.scss';
import Loader from '~/components/Animations/Loader';

const cx = classNames.bind(styles);

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      fetch('/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
        body: JSON.stringify({
          title,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          if (data.error) {
            console.log(data.error);
          } else {
            navigate('/');
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [url, navigate, title]);

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  const handleCreatePost = () => {
    setIsLoading(true);
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
        setUrl(data.url);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
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
      {isLoading ? (
        <Loader />
      ) : (
        <div className={cx('body')}>
          <input
            className={cx('caption')}
            type="text"
            placeholder="Write a caption..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={cx('upload-btn')}>
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
          </div>
          <span>
            {image && (
              <button className={cx('share-btn')} onClick={handleCreatePost}>
                Share
              </button>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
