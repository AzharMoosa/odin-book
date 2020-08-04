import React, { Fragment } from "react";
import PostItem from "./PostItem";

const Posts = ({ posts, updatePost, loading }) => {
  return (
    <Fragment>
      {!loading &&
        posts.map((post) => (
          <PostItem key={post._id} postData={post} updatePost={updatePost} />
        ))}
    </Fragment>
  );
};

export default Posts;
