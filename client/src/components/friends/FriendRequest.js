import React, { useEffect, Fragment } from "react";
import Spinner from "../layout/Spinner";

const FriendsRequest = ({
  user,
  updateUser,
  id,
  setLoadFriend,
  loadFriend,
  loading,
  currentUser,
}) => {
  const addFriend = () => {
    const requests = [...user.friend_requests];
    requests.splice(requests.indexOf(currentUser._id), 1);

    const friendsReq = [...currentUser.friend_requests];
    friendsReq.splice(friendsReq.indexOf(id), 1);

    updateUser({ friend: currentUser, id: id, request: requests });
    updateUser({ friend: user, id: currentUser._id, request: friendsReq });
    setLoadFriend(!loadFriend);
  };

  function splitString(text, count) {
    return text.slice(0, count) + (text.length > count ? "..." : "");
  }

  const convertToBase64 = (u8) => {
    return btoa(String.fromCharCode.apply(null, u8));
  };

  return (
    <Fragment>
      {!loading && currentUser !== null ? (
        <div className='add-friend mt-1'>
          <div className='add-friend-info'>
            <div className='add-friend-user mr-1'>
              <img
                className='profile-pic'
                src={`data:image/png;base64,${convertToBase64(
                  currentUser.img.data.data
                )}`}
                alt='user-img'
              />
            </div>
            <div className='add-friend-description'>
              <h3 className='post-author'>{currentUser.name}</h3>
              <h4 className='post-date'>{splitString(currentUser.bio, 80)}</h4>
            </div>
          </div>
          <i
            className={"fas fa-user-check add-friend-btn"}
            onClick={addFriend}
          ></i>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default FriendsRequest;
