import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import { Link } from "react-router-dom";

const ProfileInfo = () => {
  const userContext = useContext(UserContext);

  const { user, getUser, loading, updateUser } = userContext;

  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    bio: "",
    id: "",
  });

  const { name, email, bio } = updatedUser;

  useEffect(() => {
    getUser();
    if (!loading) {
      setUpdatedUser({
        ...updatedUser,
        name: user.name,
        email: user.email,
        bio: user.bio,
        id: user._id,
      });
    }
    // eslint-disable-next-line
  }, [loading]);

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(updatedUser);
  };

  const onChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
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
      <form className='login-form profile-form' onSubmit={onSubmit}>
        <div className='form-group profile-input'>
          <i className='fa fa-user icon'></i>
          <input
            className='input-field profile-field'
            type='text'
            placeholder='Name'
            name='name'
            onChange={onChange}
            value={name}
            required
          />
        </div>

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

        <button className='btn-primary btn-register' type='submit'>
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
