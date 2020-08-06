import React, { useState, useContext, useEffect } from "react";
import PostContext from "../../context/posts/postContext";
import AlertContext from "../../context/alert/alertContext";

const CreatePost = () => {
  const postContext = useContext(PostContext);
  const alertContext = useContext(AlertContext);
  const [post, setPost] = useState({
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const { addPost, getPosts } = postContext;
  const { setAlert } = alertContext;
  const { content } = post;

  useEffect(() => {
    getPosts();
    setLoading(false);
    // eslint-disable-next-line
  }, [loading]);

  const onChange = (e) => setPost({ ...post, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (content === "") {
      setAlert("Please fill post field", "danger");
    } else {
      addPost({
        content,
      });
      setPost({ content: "" });
    }
    setLoading(true);
  };

  return (
    <div className='create-post'>
      <div className='create-post-title'>
        <h3>Create Post</h3>
      </div>
      <form className='create-post-content' onSubmit={onSubmit}>
        <div>
          <button className='post-btn' type='submit'>
            Post
          </button>
        </div>
        <textarea
          name='content'
          placeholder='Write something...'
          value={content}
          onChange={onChange}
        ></textarea>
      </form>
    </div>
  );
};

export default CreatePost;
