import React, { Fragment, useEffect, useContext } from "react";
import UserContext from "../../context/user/userContext";

const ProfilePicture = () => {
  const userContext = useContext(UserContext);
  const { user, getUser } = userContext;

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const convertToBase64 = (u8) => {
    return btoa(String.fromCharCode.apply(null, u8));
  };

  return (
    <Fragment>
      {user !== null && (
        <img
          src={`data:image/png;base64,${convertToBase64(user.img.data.data)}`}
          alt='user-img'
        />
      )}
    </Fragment>
  );
};

export default ProfilePicture;
