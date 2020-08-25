import React, { useContext, useEffect } from "react";
import CreatePost from "../posts/CreatePost";
import ProfilePicture from "./ProfilePicture";
import UserContext from "../../context/user/userContext";

const Sidebar = () => {
  const userContext = useContext(UserContext);
  const { user, getUser, loading } = userContext;

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, [loading]);

  return (
    <div className='sidebar'>
      <ProfilePicture user={user} />
      <CreatePost />
    </div>
  );
};

export default Sidebar;
