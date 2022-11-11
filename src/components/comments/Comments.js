import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from "./CommentsList"
import { useCallback } from 'react';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const {sendRequest, status, data:loadedComments} = useHttp(getAllComments, true);
  useEffect(()=>{
    sendRequest(params.newQuote)
  },[params.newQuote, sendRequest])
  let comments;
const addCommentHandler= useCallback(()=>{  
  sendRequest(params.newQuote)
  setIsAddingComment(false)
},[sendRequest,params.newQuote])
  if(status === "pending" ){
     comments= <div className="centered">
       <LoadingSpinner/>
      </div>
  }
  if (status === "completed" && (loadedComments && loadedComments.length>0)){
  comments=<CommentsList comments={loadedComments}/>
  }
  if(status === "completed" && (!loadedComments || loadedComments.length === 0)){
comments = <p className="centered">No comments were added yet!</p>
  }

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteID={params.newQuote} onAddComment={addCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
