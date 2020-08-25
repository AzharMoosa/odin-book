import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const ProfileInfo = ({ user, loading, updateUser }) => {
  const [updatedUser, setUpdatedUser] = useState({
    email: "",
    bio: "",
    id: "",
    avatar: "",
  });

  const { email, bio, avatar } = updatedUser;

  useEffect(() => {
    if (!loading) {
      setUpdatedUser({
        ...updatedUser,
        email: user.email,
        bio: user.bio,
        id: user._id,
        avatar: "",
      });
    }
    // eslint-disable-next-line
  }, [loading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    updateUser(updatedUser);
    setUpdatedUser({ ...updatedUser, avatar: "" });
  };

  const onChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const changeImage = (e) => {
    setUpdatedUser({ ...updatedUser, avatar: e.target.files[0] });
  };

  return (
    <div className='profile'>
      <div className='links'>
        <Link to='/myposts' className='link'>
          My Posts
        </Link>
        <Link to='/friends' className='link'>
          Friends
        </Link>
      </div>
      <h3 className='timeline-title mt-3'>Profile Information</h3>
      <form
        className='login-form profile-form'
        encType='multipart/form-data'
        onSubmit={onSubmit}
        method='POST'
      >
        <div className='form-group profile-input'>
          <i className='fa fa-envelope icon'></i>
          <input
            className='input-field profile-field'
            type='email'
            placeholder='Email'
            name='email'
            onChange={onChange}
            value={email}
            required
          />
        </div>

        <div>
          <h3 className='timeline-title mt-3'>Profile Image</h3>
          <input
            type='file'
            id='file'
            name='avatar'
            className='inputfile'
            onChange={changeImage}
            accept='image/x-png, image/jpeg'
          />
          <label htmlFor='file'>
            {avatar === "" ? "Choose an Image" : avatar.name}
          </label>
        </div>

        <div>
          <h3 className='timeline-title mt-3'>Profile Description</h3>

          <div className='form-group profile-input profile-field'>
            <textarea
              name='bio'
              className='bio-content'
              onChange={onChange}
              value={bio}
              required
            ></textarea>
          </div>
        </div>

        <div>
          <button className='btn-primary btn-register' type='submit'>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
