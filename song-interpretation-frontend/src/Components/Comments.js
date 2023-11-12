import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CommentAddForm from './CommentAddForm';

const Comments = (props) => {
    const { id } = props;
    const [ comments, setComments ] = useState([]);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/songs/${id}/comments`)
            .then(res=>{
                console.log(res.data);
                setComments(res.data);
            })
            .catch(err=>{
                console.error(err);
            })
    },[]);

    return(
        <div>
            {comments.map(comment=>{
                return(<div key={comment._id}>
                    <p>{comment.comment}</p>
                    <p>User: {comment.username}</p>
                </div>)
            })}
            <CommentAddForm setComments={setComments} id={id}/>
        </div>
    )
}

export default Comments;
