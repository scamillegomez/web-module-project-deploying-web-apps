import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const initialCommentState = {
  comment: "",
  username: "",
}

const CommentAddForm = (props) => {

  const { setComments, id } = props;
  const [commentItem, setCommentItem] = useState(initialCommentState);

  const handleChange = (e) => {
    setCommentItem({
      ...commentItem,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(commentItem);
    axios.post(`${process.env.REACT_APP_API_URL}/songs/${id}/comments`, commentItem)
    //axios.post(`http://localhost:3001/songs/${id}/comments`, commentItem)
      .then(res => {
        console.log("New comment response:",res.data);
        setComments(prevComments=> [...prevComments, res.data]);
        setCommentItem(initialCommentState);
      })
      .catch(err => {
        console.error('Error posting comment:', err);
      })
  }

  const { comment, username } = commentItem;

  return (
    <div className='comment-form-container'>
        <form onSubmit={handleSubmit} className='comment-form'>
          {/* <div className="comment-form"> */}
            <input
                type="text" 
                name="username"
                value={username}
                placeholder="username"
                onChange={handleChange}
                className="comment-form-element name"
              />
            <textarea
                type="text"
                name="comment"
                value={comment}
                placeholder="enter comment here"
                onChange={handleChange}
              className="comment-form-element">
            </textarea>
            <button className="comment-form-element button">SUBMIT</button>
            {/* </div> */}
        </form>
    </div>
  );
}

export default CommentAddForm;