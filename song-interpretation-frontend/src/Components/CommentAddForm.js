import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CommentAddForm = (props) => {

  const { setComments, id } = props;
  const [commentItem, setCommentItem] = useState({
    comment: "",
    username: "",
  });

  const handleChange = (e) => {
    setCommentItem({
      ...commentItem,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(commentItem);
    axios.post(`http://localhost:3001/songs/${id}/comments`, commentItem)
      .then(res => {
        console.log(res);
        setComments(prevComments=> [...prevComments, res.data]);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const { comment, username } = commentItem;

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="comment"
                value={comment}
                placeholder="enter comment here"
                onChange={handleChange}
            />
            <input 
                type="text" 
                name="username"
                value={username}
                placeholder="username"
                onChange={handleChange}
            />
            <button>Submit</button>
        </form>
    </div>
  );
}

export default CommentAddForm;