import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const PostContent = ({ postData, user }) => {
  const formattedDate = moment(postData.date).format("DD/MM/YYYY");

  const convertToBase64 = (u8) => {
    return btoa(String.fromCharCode.apply(null, u8));
  };

  return (
    <div className='post'>
      <div className='post-top'>
        <div className='post-info'>
          {user !== null && (
            <img
              className='profile-pic'
              src={`data:image/png;base64,${convertToBase64(
                user.img.data.data
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
    </div>
  );
};

export default PostContent;
