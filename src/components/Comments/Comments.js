import React, { useEffect, useCallback, useState, useRef } from 'react';

import CommentForm from './CommentForm/CommentForm';
import CommentsList from './CommentsList/CommentList';
import MessageBox from '../MessageBox/MessageBox';

import Loader from '../Loader/Loader';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)  

const Comments = props => {
    const { postId } = props;
    const [commentId, setCommentId] = useState(null);
    const [commentAdded, setCommentAdded] = useState(false);

    const [comments, setComments] = useState(null);
    const [responses, setResponses] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const parsedPostId = postId.replace('blogpost_', '');

    const fetchNewData = useCallback(async () => {
        const response = await fetch(`/.netlify/functions/fetchComment?postId=${postId.replace('blogpost_', '')}`);
        const result = await response.json();
        console.log(result);
        if(result && result.data && result.data.comments){
            setComments(result.data.comments);
            setResponses(result.data.responses);
        }
    },[postId]);
    
    useEffect(() => {
        setIsLoading(true);
        fetchNewData();
        setIsLoading(false);
        
    }, [postId, fetchNewData]);

    const executeScroll = () => scrollToRef(myRef);

    const onResponseHandler = (comId) => {
        setCommentId(comId);
        executeScroll();
    };

    const myRef = useRef(null);

    return (
        <div>
            {!commentAdded ?
                <div
                    ref={myRef}
                >
                    <CommentForm
                        postId={parsedPostId}
                        isResponse={commentId}
                        commentId={commentId}
                        onFormSubmit={() => {
                            setCommentAdded(true);
                            if(commentId){
                                setCommentId(null);
                            }
                        }}
                    />
                </div>
                :
                <MessageBox
                    onClose={() => {
                        setCommentAdded(false)
                        fetchNewData();
                    }}
                />
            }
            <section className="comment-wrapper">
                {isLoading ? 
                    <Loader />
                    :
                    postId ?
                        <>
                            <h3>Comments</h3>
                            <CommentsList
                                postId={postId}
                                comments={comments}
                                responses={responses}
                                onResponse={onResponseHandler}
                            />
                        </>
                        : 'Comments'
                        
                }
            </section>
        </div>
    );
}

export default Comments;
