import React, { useContext, useEffect, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import ProfilePicture from "../layout/ProfilePicture";
import ProfileInfo from "../profile/ProfileInfo";
import UserContext from "../../context/user/userContext";
import Spinner from "../layout/Spinner";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const { user, getUser, loading } = userContext;

  useEffect(() => {
    authContext.loadUser();
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {!loading && user !== null ? (
        <div className='bg-light home-container'>
          <div className='sidebar'>
            <ProfilePicture />
            <h1 className='profile-user-name'>{!loading && user.name}</h1>
          </div>
          <ProfileInfo />
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Profile;
