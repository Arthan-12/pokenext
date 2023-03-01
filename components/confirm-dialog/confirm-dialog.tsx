import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  dialogText?: string;
  dialogSubtext?: string;
  show?: boolean;
  confirmAction: (confirm: boolean) => void;
}

const ConfirmDialog = ({
  dialogText,
  dialogSubtext,
  show,
  confirmAction,
}: Props) => {
  return (
    <Modal centered show={show}>
      <Modal.Header>
        <Modal.Title>{dialogText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{dialogSubtext}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => confirmAction(false)}>
          Cancel
        </Button>
        <Button variant="success" onClick={() => confirmAction(true)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;
