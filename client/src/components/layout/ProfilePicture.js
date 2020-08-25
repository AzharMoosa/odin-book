import React, { Fragment } from "react";

const ProfilePicture = ({ user }) => {
  const convertToBase64 = (u8) => {
    return btoa(String.fromCharCode.apply(null, u8));
  };

  return (
    <Fragment>
      {user !== null && (
        <img
          src={`data:image/png;base64,${convertToBase64(user.img.data.data)}`}
          alt='user-img'
          className='sidebar-img'
        />
      )}
    </Fragment>
  );
};

export default ProfilePicture;
