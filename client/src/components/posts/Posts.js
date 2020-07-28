import React, { Fragment, useContext, useEffect } from "react";
import PostItem from "./PostItem";
import PostContext from "../../context/posts/postContext";
import Spinner from "../layout/Spinner";

const Posts = () => {
  const postContext = useContext(PostContext);

  const { posts, getPosts, loading, updatePost } = postContext;

  useEffect(() => {
    getPosts();

    // eslint-disable-next-line
  }, [loading]);

  if (posts !== null && posts.length === 0) {
    return <h4 className='no-posts'>Timeline is Empty.</h4>;
  }

  return (
    <Fragment>
      {posts !== null && !loading ? (
        posts.map((post) => (
          <PostItem key={post._id} postData={post} updatePost={updatePost} />
        ))
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Posts;
