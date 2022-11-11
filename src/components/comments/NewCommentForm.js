import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const [spinner, setSpinner]=useState(true)
  const {onAddComment} = props
  const commentTextRef = useRef();
  const {sendRequest, status, error} = useHttp(addComment, true)

  useEffect(()=>{
  if (status === "completed" && !error){
    onAddComment()
  }
  },[status, error, onAddComment])
  const submitFormHandler = (event) => {
    setSpinner(false)
    event.preventDefault();
    const enteredText =commentTextRef.current.value

    // optional: Could validate here

    // send comment to server
    sendRequest({commentData:{text:enteredText},quoteId:props.quoteID})

    // sendRequest({commentData:enteredText,quoteId:props.quoteID})
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
    {!spinner && status === "pending" && (<div className="centered"><LoadingSpinner/></div>)}

      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div> 
    </form>
  );
};

export default NewCommentForm;
