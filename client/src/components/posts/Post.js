import React, { useContext, useEffect, Fragment, useState } from "react";
import AuthContext from "../../context/auth/authContext";
import PostContext from "../../context/posts/postContext";
import AlertContext from "../../context/alert/alertContext";
import UserContext from "../../context/user/userContext";
import Spinner from "../layout/Spinner";
import Comments from "./Comments";
import { uuid } from "uuidv4";

const Post = (props) => {
  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);
  const [text, setText] = useState("");

  const { current, getPost, loading, updatePost, getPosts } = postContext;
  const { setAlert } = alertContext;
  const { user, getUser, users_list, getUsers } = userContext;

  useEffect(() => {
    authContext.loadUser();
    getUser();
    getUsers();
    getPosts();
    getPost(getID());
    // eslint-disable-next-line
  }, [text]);

  const getID = () => {
    const { match } = props;
    let { id } = match.params;
    return id;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please fill comment field", "danger");
    } else {
      updatePost({
        ...current,
        text,
        user,
      });
      setText("");
    }
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <Fragment>
      {current !== null && !loading && users_list !== null ? (
        <div className='post-container'>
          <h3 className='timeline-title'>Post Content</h3>
          <textarea
            name='post-content'
            className='post-text'
            value={current.content}
            disabled
          ></textarea>
          <form className='comment-form' onSubmit={onSubmit}>
            <h3 className='timeline-title'>Comments</h3>
            <div className='form-group profile-input'>
              <i className='fa fa-comment icon' onClick={onSubmit}></i>
              <input
                className='input-field profile-field'
                type='text'
                placeholder='Comment'
                name='text'
                value={text}
                onChange={onChange}
              />
            </div>
          </form>
          {
            // eslint-disable-next-line
            current.comments.map((comment) => {
              for (let i = 0; i < users_list.length; i++) {
                if (comment.user === users_list[i]._id) {
                  return (
                    <Comments
                      key={uuid()}
                      comment={comment}
                      currentUser={users_list[i]}
                    />
                  );
                }
              }
            })
          }
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Post;
