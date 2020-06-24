import React from 'react';

import CommentItem from '../CommentItem/CommentItem';

const CommentsList = (props) => {
    const { comments, responses, onResponse } = props;

    return (
        <>
            {comments && 
                <CommentItem
                    comments={comments}
                    responses={responses}
                    onResponse={onResponse}
                />
            }
        </>
    );
}

export default CommentsList;
