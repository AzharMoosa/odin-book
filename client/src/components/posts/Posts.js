import React, { Fragment, useContext, useEffect } from "react";
import PostItem from "./PostItem";
import PostContext from "../../context/posts/postContext";

const Posts = () => {
  const postContext = useContext(PostContext);

  const { posts, getPosts, loading } = postContext;

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {posts.map((post) => (
        <PostItem key={post._id} postData={post} />
      ))}
    </Fragment>
  );
};

export default Posts;
