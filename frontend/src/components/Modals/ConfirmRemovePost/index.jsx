import { Button, Modal } from 'react-bootstrap';

const ConfirmRemovePost = ({ show, handleClose, onDelete }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="sm"
      centered
      data-bs-theme="dark"
    >
      <Modal.Header closeButton>
        <Modal.Title>Remove Post?</Modal.Title>
      </Modal.Header>
      <Modal.Body>This will remove your post?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmRemovePost;
