import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import ProfilePicture from "../layout/ProfilePicture";
import ProfileInfo from "../profile/ProfileInfo";
import UserContext from "../../context/user/userContext";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const { user, getUser, loading } = userContext;

  useEffect(() => {
    authContext.loadUser();
    getUser();
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className='bg-light home-container'>
      <div className='sidebar'>
        <ProfilePicture />
        <h1 className='profile-user-name'>{!loading && user.name}</h1>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default Profile;
