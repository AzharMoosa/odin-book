import React, { useContext, useEffect } from "react";
import Posts from "../posts/Posts";
import PostContext from "../../context/posts/postContext";
import Spinner from "../layout/Spinner";

const ViewPosts = () => {
  const postContext = useContext(PostContext);
  const { posts, getPosts, loading, updatePost } = postContext;

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='myposts'>
      <h3 className='timeline-title'>My Posts</h3>

      {posts !== null && !loading ? (
        <Posts posts={posts} loading={loading} updatePost={updatePost} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ViewPosts;
