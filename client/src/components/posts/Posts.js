import React, { Fragment } from "react";
import PostItem from "./PostItem";

const Posts = ({ posts, updatePost, loading, users_list }) => {
  return (
    <Fragment>
      {!loading &&
        users_list !== null &&
        // eslint-disable-next-line
        posts.map((post) => {
          for (let i = 0; i < users_list.length; i++) {
            if (users_list[i]._id === post.user) {
              return (
                <PostItem
                  key={post._id}
                  postData={post}
                  updatePost={updatePost}
                  currentUser={users_list[i]}
                />
              );
            }
          }
        })}
    </Fragment>
  );
};

export default Posts;
