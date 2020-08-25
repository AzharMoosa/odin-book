import React from "react";
import moment from "moment";

const Comments = ({ comment, currentUser }) => {
  const formattedDate = moment(comment.date).format("DD/MM/YYYY");

  const convertToBase64 = (u8) => {
    return btoa(String.fromCharCode.apply(null, u8));
  };

  return (
    <div className='post'>
      <div className='post-top'>
        <div className='post-info'>
          <img
            className='profile-pic'
            src={`data:image/png;base64,${convertToBase64(
              currentUser.img.data.data
            )}`}
            alt='user-img'
          />
          <div className='post-info-content'>
            <h3 className='post-author'>{currentUser.name}</h3>
            <h4 className='post-date'>{formattedDate}</h4>
          </div>
        </div>
      </div>

      <textarea
        className='post-content'
        disabled
        value={comment.text}
      ></textarea>
    </div>
  );
};

export default Comments;
