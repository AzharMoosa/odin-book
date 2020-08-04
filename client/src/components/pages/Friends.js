import React, { useContext, useEffect, Fragment } from "react";
import AuthContext from "../../context/auth/authContext";
import ProfilePicture from "../layout/ProfilePicture";
import FriendList from "../friends/FriendList";
import AddFriends from "../friends/AddFriends";
import UserContext from "../../context/user/userContext";
import Spinner from "../layout/Spinner";

const Friends = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
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
    // eslint-disable-next-line
  }, []);

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
              user.friends.map((friend) => (
                <FriendList friend={friend} key={friend._id} />
              ))
            ) : (
              <h4 className='no-posts'>Friend List is Empty.</h4>
            )}
            <h3 className='timeline-title mt-3'>Find Friends</h3>
            {users_list.length > 0 ? (
              users_list.map((currentUser) => {
                if (
                  currentUser.name !== user.name &&
                  !currentUser.friend_requests.some(
                    (friend) => friend.name === user.name
                  ) &&
                  !currentUser.friends.some(
                    (friend) => friend.name === user.name
                  )
                ) {
                  return (
                    <AddFriends
                      currentUser={currentUser}
                      key={currentUser._id}
                      id={user._id}
                      user={user}
                      updateUser={updateUser}
                      btn={"request"}
                    />
                  );
                }
              })
            ) : (
              <h4 className='no-posts'>No Users Available</h4>
            )}
            <h3 className='timeline-title mt-3'>Friend Requests</h3>
            {user.friend_requests.length > 0 ? (
              user.friend_requests.map(
                (currentUser) =>
                  currentUser.name !== user.name && (
                    <AddFriends
                      currentUser={currentUser}
                      user={user}
                      key={currentUser._id}
                      id={user._id}
                      updateUser={updateUser}
                    />
                  )
              )
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
