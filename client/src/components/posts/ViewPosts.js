import React, { useContext, useEffect } from "react";
import Posts from "../posts/Posts";
import PostContext from "../../context/posts/postContext";
import Spinner from "../layout/Spinner";
import UserContext from "../../context/user/userContext";

const ViewPosts = () => {
  const postContext = useContext(PostContext);
  const userContext = useContext(UserContext);
  const { posts, getPosts, loading, updatePost } = postContext;
  const { getUsers, users_list } = userContext;

  useEffect(() => {
    getPosts();
    getUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='myposts'>
      <h3 className='timeline-title'>My Posts</h3>

      {posts !== null && !loading && users_list !== null ? (
        <Posts
          posts={posts}
          loading={loading}
          updatePost={updatePost}
          users_list={users_list}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ViewPosts;
