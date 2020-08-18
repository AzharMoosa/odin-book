import React, { useContext, useEffect } from "react";
import moment from "moment";
import UserContext from "../../context/user/userContext";
import { Link } from "react-router-dom";

const PostItem = ({ postData, updatePost, currentUser }) => {
  const formattedDate = moment(postData.date).format("DD/MM/YYYY");
  const userContext = useContext(UserContext);
  const { user, getUser, loading } = userContext;

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const convertToBase64 = (u8) => {
    return btoa(String.fromCharCode.apply(null, u8));
  };

  const likePost = () => {
    // Get Current Likes
    let currentLikes = [...postData.likes];

    // If Previous Likes
    if (currentLikes.length > 0) {
      currentLikes.forEach((current) => {
        if (current.toString() === user._id.toString()) {
          // Remove Like
          currentLikes.splice(currentLikes.indexOf(current), 1);
          updatePost({
            ...postData,
            likes: currentLikes,
          });
        } else {
          // Add Like
          updatePost({
            ...postData,
            likes: [...postData.likes, user._id],
          });
        }
      });
    } else {
      updatePost({ ...postData, likes: [...postData.likes, user._id] });
    }

    return true;
  };

  return (
    <div className='post'>
      <div className='post-top'>
        <div className='post-info'>
          {currentUser !== null && !loading && (
            <img
              className='profile-pic'
              src={`data:image/png;base64,${convertToBase64(
                currentUser.img.data.data
              )}`}
              alt='user-img'
            />
          )}
          <div className='post-info-content'>
            <Link to={`/users/${postData.user}`} className='author-link'>
              <h3 className='post-author'>{postData.author}</h3>
            </Link>
            <h4 className='post-date'>{formattedDate}</h4>
          </div>
        </div>
        <div className='post-numbers'>
          <div className='like-count'>
            <i className='fas fa-thumbs-up text-secondary'></i>
            <h4>{postData.likes.length}</h4>
          </div>
          <div className='comment-count'>
            <i className='fas fa-comment text-secondary'></i>
            <h4>{postData.comments.length}</h4>
          </div>
        </div>
      </div>

      <textarea
        className='post-content'
        disabled
        value={postData.content}
      ></textarea>

      <div className='post-actions'>
        <div className='like-post'>
          <i className='far fa-thumbs-up text-secondary' onClick={likePost}></i>
          <h4 className='text-secondary'>Like</h4>
        </div>

        <div className='comment-post'>
          <Link to={`/posts/${postData._id}`}>
            <i className='far fa-comment text-secondary'></i>
          </Link>

          <h4 className='text-secondary'>Comment</h4>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
