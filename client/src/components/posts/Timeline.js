import React, { useContext, useEffect } from "react";
import Posts from "./Posts";
import { Link } from "react-router-dom";
import PostContext from "../../context/posts/postContext";
import UserContext from "../../context/user/userContext";
import Spinner from "../layout/Spinner";

const Timeline = () => {
  const postContext = useContext(PostContext);
  const userContext = useContext(UserContext);

  const { posts, updatePost } = postContext;
  const {
    getUsersPost,
    friends_posts,
    loading,
    getUsers,
    users_list,
  } = userContext;

  useEffect(() => {
    getUsersPost();
    getUsers();
    // eslint-disable-next-line
  }, [posts]);

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
      {!loading && friends_posts !== null && users_list !== null ? (
        <Posts
          posts={
            friends_posts.length > 30
              ? friends_posts.slice(0, 30)
              : friends_posts
          }
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

export default Timeline;
