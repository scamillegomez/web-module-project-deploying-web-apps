import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CommentAddForm from './CommentAddForm';
import Spinner from './Spinner';

const Comments = (props) => {
    const { id } = props;
    const [ comments, setComments ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        // axios.get(`${process.env.REACT_APP_API_URL}/songs/${id}/comments`)
        setIsLoading(true); // Start loading
        //axios.get(`http://localhost:3001/songs/${id}/comments`)
            axios.get(`${process.env.REACT_APP_API_URL}/songs/${id}/comments`)
            .then(res=>{
                console.log(res.data);
                setComments(res.data);
            })
            .catch(err=>{
                console.error(err);
            })
            .finally(()=>{
                setIsLoading(false); // Stop loading after data is fetched
            })
    },[]);

    

    return(
        <div className='comments-section'>
            {/* <div className='comments-section-divider'></div> */}
            {/* <h6 className='comments-title'>Comments</h6> */}
            {comments.map(comment=>{
                return(
                <div key={comment._id} className='comment-item'>
                {/* <div className='comment-item-divider'></div> */}
                    <div className='comment-item-text'>
                        <span className='comment-user'>{comment.username}</span>
                        <span className='comment-text'>{comment.comment}</span>
                    </div>
                </div>
                
                )
            })}
            <CommentAddForm setComments={setComments} id={id}/>
        </div>
    )
}

export default Comments;
