import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Modal } from 'react-bootstrap';
import { IoSearchOutline } from 'react-icons/io5';
import { IoIosCloseCircle } from 'react-icons/io';
import { TbLoader2 } from 'react-icons/tb';

import styles from './Search.module.scss';
import { UserContext } from '~/App';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

const Search = ({ title }) => {
  const { state } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);

  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 500);

  const handleClose = () => {
    setShow(false);
    setSearchValue('');
    setNoResult(false);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      setNoResult(false);
      return;
    }

    setLoading(true);

    fetch('/searchUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: debounced,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setSearchResult(result.user);
        setNoResult(result.user.length === 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [debounced]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    setNoResult(false);
    inputRef.current.focus();
  };

  return (
    <>
      <button onClick={handleShow} className={cx('button')}>
        <IoSearchOutline className={cx('icon')} />
        <span>{title}</span>
      </button>

      <Modal show={show} onHide={handleClose} data-bs-theme="dark">
        <Modal.Header closeButton className={cx('header')}>
          <Modal.Title className={cx('title')}>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body className={cx('content')}>
          <div>
            <div className={cx('search')}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={handleChange}
                autoFocus
              />
              {!!searchValue && !loading && (
                <button className={cx('clear-btn')} onClick={handleClear}>
                  <IoIosCloseCircle className={cx('clear')} />
                </button>
              )}
              {loading && <TbLoader2 className={cx('loader')} />}
            </div>
            <div className={cx('results')}>
              {searchValue !== '' &&
                searchResult.length > 0 &&
                searchResult.map((user) => {
                  return (
                    <Link
                      to={
                        state && state._id && state._id !== user._id
                          ? `/profile/${user._id}`
                          : '/profile'
                      }
                      className={cx('user')}
                      key={user._id}
                      onClick={handleClose}
                    >
                      <img
                        className={cx('avatar')}
                        src={user.avatar}
                        alt="avatar"
                      />
                      <div className={cx('info')}>
                        <h4 className={cx('username')}>{user.email}</h4>
                        <h5 className={cx('full-name')}>{user.name}</h5>
                      </div>
                    </Link>
                  );
                })}
              {noResult && (
                <div className={cx('no-result')}>User not found</div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Search;
