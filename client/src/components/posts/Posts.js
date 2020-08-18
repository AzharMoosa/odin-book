import React, { Fragment } from "react";
import PostItem from "./PostItem";

const Posts = ({ posts, updatePost, loading, users_list }) => {
  return (
    <Fragment>
      {!loading &&
        users_list !== null &&
        // eslint-disable-next-line
        users_list.map((currentUser) => {
          for (let i = 0; i < posts.length; i++) {
            if (currentUser._id === posts[i].user) {
              return (
                <PostItem
                  key={posts[i]._id}
                  postData={posts[i]}
                  updatePost={updatePost}
                  currentUser={currentUser}
                />
              );
            }
          }
        })}
    </Fragment>
  );
};

export default Posts;
