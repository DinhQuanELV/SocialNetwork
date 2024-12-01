import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';

const cx = classNames.bind(styles);

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      fetch('/createpost', {
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
          if (data.error) {
            console.log(data.error);
          } else {
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url, navigate, title]);

  const handleCreatePost = () => {
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
        console.log(err);
      });
  };

  return (
    <div className={cx('wrapper')}>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={cx('btn')}>
        <span>Select from computer</span>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <button onClick={handleCreatePost}>Share</button>
    </div>
  );
};

export default CreatePost;
