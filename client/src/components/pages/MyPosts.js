import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Sidebar from "../layout/Sidebar";
import ViewPosts from "../posts/ViewPosts";

const MyPosts = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className='bg-light home-container'>
      <Sidebar />
      <ViewPosts />
    </div>
  );
};

export default MyPosts;
