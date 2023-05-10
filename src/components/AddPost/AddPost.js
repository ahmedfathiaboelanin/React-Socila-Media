import React from 'react'
import './AddPost.css'
import Modal from './Modal/Modal'
import ProfileImg from '../profileImg/ProfileImg'
function AddPost() {
  return (
      <div className='addPost'>
        <ProfileImg/>
        <Modal/>
    </div>
  )
}

export default AddPost