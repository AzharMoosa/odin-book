import React, { useContext, useEffect, Fragment, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import ProfilePicture from "../layout/ProfilePicture";
import FriendList from "../friends/FriendList";
import AddFriends from "../friends/AddFriends";
import FriendRequest from "../friends/FriendRequest";
import UserContext from "../../context/user/userContext";
import Spinner from "../layout/Spinner";

const Friends = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const [loadFriend, setLoadFriend] = useState(true);
  const {
    user,
    getUser,
    loading,
    getUsers,
    users_list,
    updateUser,
  } = userContext;

  useEffect(() => {
    authContext.loadUser();
    getUsers();
    getUser();
    setLoadFriend(false);

    // eslint-disable-next-line
  }, [loadFriend]);

  return (
    <Fragment>
      {users_list !== null && user !== null && !loading ? (
        <div className='bg-light home-container'>
          <div className='sidebar'>
            <ProfilePicture />
            <h1 className='profile-user-name'>{!loading && user.name}</h1>
          </div>
          <div className='myposts'>
            <h3 className='timeline-title mb-2'>My Friends</h3>
            {user.friends.length > 0 ? (
              // eslint-disable-next-line
              users_list.map((currentUser) => {
                // eslint-disable-next-line
                for (let i = 0; i < user.friends.length > 0; i++) {
                  if (currentUser._id === user.friends[i]) {
                    return (
                      <FriendList
                        currentUser={currentUser}
                        key={currentUser._id}
                        loading={loading}
                      />
                    );
                  }
                }
              })
            ) : (
              <h4 className='no-posts'>Friend List is Empty.</h4>
            )}
            <h3 className='timeline-title mt-3'>Find Friends</h3>
            {users_list.length > 0 ? (
              // eslint-disable-next-line
              users_list.map((currentUser) => {
                if (
                  currentUser.name !== user.name &&
                  !currentUser.friend_requests.some(
                    (friend) => friend === user._id
                  ) &&
                  !currentUser.friends.some((friend) => friend === user._id)
                ) {
                  return (
                    <AddFriends
                      setLoadFriend={setLoadFriend}
                      loadFriend={loadFriend}
                      currentUser={currentUser}
                      key={currentUser._id}
                      id={user._id}
                      user={user}
                      updateUser={updateUser}
                    />
                  );
                }
              })
            ) : (
              <h4 className='no-posts'>No Users Available</h4>
            )}
            <h3 className='timeline-title mt-3'>Friend Requests</h3>
            {user.friend_requests.length > 0 ? (
              // eslint-disable-next-line
              users_list.map((currentUser) => {
                for (let i = 0; i < user.friend_requests.length; i++) {
                  if (currentUser._id === user.friend_requests[i]) {
                    return (
                      <FriendRequest
                        setLoadFriend={setLoadFriend}
                        loadFriend={loadFriend}
                        currentUser={currentUser}
                        user={user}
                        key={currentUser._id}
                        id={user._id}
                        updateUser={updateUser}
                        loading={loading}
                      />
                    );
                  }
                }
              })
            ) : (
              <h4 className='no-posts'>No Friend Requests</h4>
            )}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Friends;
