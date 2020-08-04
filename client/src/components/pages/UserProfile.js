import React, { useContext, useEffect, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import ProfilePicture from "../layout/ProfilePicture";
import UserContext from "../../context/user/userContext";
import PostContext from "../../context/posts/postContext";
import Spinner from "../layout/Spinner";
import PostContent from "../posts/PostContent";

const UserProfile = (props) => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
  const { getUserByID, loading, current_user } = userContext;
  const { getUserPosts, current_posts, clearCurrentPosts } = postContext;

  useEffect(() => {
    authContext.loadUser();
    clearCurrentPosts();
    getUserByID(getID());
    getUserPosts(getID());
    // eslint-disable-next-line
  }, []);

  const getID = () => {
    const { match } = props;
    let { id } = match.params;
    return id;
  };

  return (
    <Fragment>
      {!loading && current_user !== null && current_posts !== null ? (
        <div className='bg-light home-container'>
          <div className='sidebar'>
            <ProfilePicture />
            <h1 className='profile-user-name'>{current_user.name}</h1>
          </div>
          <div className='profile'>
            <h3 className='timeline-title mt-3'>Profile Bio</h3>
            <p className='profile-bio mt-2'>{current_user.bio}</p>
            <h3 className='timeline-title mt-3'>Posts</h3>
            {current_posts.map((post) => (
              <PostContent key={post._id} postData={post} />
            ))}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default UserProfile;
