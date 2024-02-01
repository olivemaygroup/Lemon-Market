import React, { useState } from 'react'
import './rating.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface AddCommentInterface {
  TOPIC: string,
  comment: string, 
  setComment: Function;
}

const AddComment: React.FC<AddCommentInterface> = ({ setComment }) => {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setComment(input);
    handleClose();
    setInput('');
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Comment</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              autoFocus
              maxLength="120"
            />
            <button type="submit">Save Comment</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddComment;