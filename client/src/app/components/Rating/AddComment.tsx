import React, { useState } from 'react';
import './rating.css'; // Ensure CSS is correctly imported
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

interface AddCommentInterface {
  commentState: string,
  commentSetter: React.Dispatch<React.SetStateAction<string>>
}

const AddComment: React.FC<AddCommentInterface> = ({ commentState, commentSetter }) => {
  const [input, setInput] = useState(commentState);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    commentSetter(input);
    handleClose();
  };

  const handleCancel = () => {
    setInput('');
    commentSetter('');
    handleClose;
  };

  return (
    <div>
      <Button 
      className='addreview-add-btn'
      onClick={handleOpen}
      >
        {input ? 'Edit Comment' : 'Add Comment'}
        </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="modal-container">
          <form onSubmit={handleSubmit} className='specific-comment-box'>
            <textarea
              className="comment_input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              maxLength={120}
            />

            <div className='modal-btns-container'>
            <button className='modal-btns' onClick={handleCancel}>Cancel</button>
            <button className='modal-btns' type="submit">Save</button>
            </div>

          </form>
          
        </Box>
      </Modal>
    </div>
  );
};

export default AddComment;
