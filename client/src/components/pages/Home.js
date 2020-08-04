import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import UserContext from "../../context/user/userContext";
import Sidebar from "../layout/Sidebar";
import Timeline from "../posts/Timeline";

const Home = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const { getUser } = userContext;

  useEffect(() => {
    authContext.loadUser();
    getUser();
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
