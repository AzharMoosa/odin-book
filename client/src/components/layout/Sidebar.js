import React from "react";
import CreatePost from "../posts/CreatePost";
import ProfilePicture from "./ProfilePicture";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <ProfilePicture />
      <CreatePost />
    </div>
  );
};

export default Sidebar;
