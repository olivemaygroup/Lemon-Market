import React, { useState } from 'react';
import './rating.css'; // Ensure CSS is correctly imported
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const AddComment: React.FC<AddCommentInterface> = ({ metricName, commentState, commentSetter }) => {
  const [input, setInput] = useState(commentState); // Initialize with commentState if needed
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    commentSetter(input);
    handleClose();
    // setInput(''); // Resetting input
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
        <Box className="modal-container">
          <form onSubmit={handleSubmit} className='specific-comment-box'>
            <textarea
              type="text" 
              className="comment_input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              maxLength={120}
            />

            <div className='modal-btns-container'>
            <button className='modal-btns' type="reset">Cancel</button>
            <button className='modal-btns' type="submit">Save</button>
            </div>

          </form>
          
        </Box>
      </Modal>
    </div>
  );
};

export default AddComment;
