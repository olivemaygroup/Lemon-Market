import React from 'react';
import './rating.css';

const UploadPhoto = () => {
  return (
    <div className='upload-photo-btn-container'>
      <form action="/action_page.php">
        {/* <input type="file" id="photo" name="filename"/> */}
        <input type="file" id="upload-photo-btn" hidden name="filename"/>
        <label className="invisible-btn" for="upload-photo-btn">Add Photo</label>
      </form>
    </div>
  )
}

export default UploadPhoto