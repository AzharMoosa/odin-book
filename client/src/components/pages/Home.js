import React, { useContext, useEffect, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import UserContext from "../../context/user/userContext";
import PostContext from "../../context/posts/postContext";
import Sidebar from "../layout/Sidebar";
import Timeline from "../posts/Timeline";
import Spinner from "../layout/Spinner";

const Home = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
  const { getUser, user, loading } = userContext;
  const { clearCurrentPosts } = postContext;

  useEffect(() => {
    authContext.loadUser();
    getUser();
    clearCurrentPosts();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      {!loading && user !== null ? (
        <div className='bg-light home-container'>
          <Sidebar />
          <Timeline />
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Home;
