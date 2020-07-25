import React from "react";
import Posts from "../posts/Posts";

const ViewPosts = () => {
  return (
    <div className='myposts'>
      <h3 className='timeline-title'>My Posts</h3>
      <Posts />
    </div>
  );
};

export default ViewPosts;
