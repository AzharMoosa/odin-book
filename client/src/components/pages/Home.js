import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Sidebar from "../layout/Sidebar";
import Timeline from "../posts/Timeline";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
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
