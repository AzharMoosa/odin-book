import React, { useContext, useEffect } from "react";
import UserContext from "../../context/user/userContext";

const FriendList = ({ friend }) => {
  const userContext = useContext(UserContext);
  const { user, getUser, loading } = userContext;

  function splitString(text, count) {
    return text.slice(0, count) + (text.length > count ? "..." : "");
  }

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const convertToBase64 = (u8) => {
    return btoa(String.fromCharCode.apply(null, u8));
  };

  return (
    <div className='add-friend mt-1'>
      <div className='add-friend-info'>
        <div className='add-friend-user mr-1'>
          <img
            className='profile-pic'
            src={`data:image/png;base64,${convertToBase64(user.img.data.data)}`}
            alt='user-img'
          />
        </div>
        <div className='add-friend-description'>
          <h3 className='post-author'>{friend.name}</h3>
          <h4 className='post-date'>{splitString(friend.bio, 80)}</h4>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
