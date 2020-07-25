import React from "react";
import Posts from "./Posts";
import { Link } from "react-router-dom";

const Timeline = () => {
  return (
    <div className='timeline'>
      <div className='links'>
        <Link to='/myposts' className='link'>
          My Posts
        </Link>
        <Link to='/friends' className='link'>
          Friends
        </Link>
      </div>
      <h3 className='timeline-title'>Timeline</h3>
      <Posts />
    </div>
  );
};

export default Timeline;
