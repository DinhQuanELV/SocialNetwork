import classNames from 'classnames/bind';
import { Modal, Button } from 'react-bootstrap';

import styles from './EditPost.module.scss';

const cx = classNames.bind(styles);

const EditPost = ({ show, handleClose, title, onChange, onEdit }) => {
  const handleSave = () => {
    onEdit();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} data-bs-theme="dark" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          className={cx('input')}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={title}
          type="text"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPost;
