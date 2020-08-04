import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import UserContext from "../../context/user/userContext";
import PostContext from "../../context/posts/postContext";
import Sidebar from "../layout/Sidebar";
import Timeline from "../posts/Timeline";

const Home = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
  const { getUser } = userContext;
  const { clearCurrentPosts } = postContext;

  useEffect(() => {
    authContext.loadUser();
    getUser();
    clearCurrentPosts();
    // eslint-disable-next-line
  }, []);
  return (
    <div className='bg-light home-container'>
      <Sidebar />
      <Timeline />
    </div>
  );
};

export default Home;
