import React from 'react';

import ResponseItem from '../ResponseItem/ResponseItem';
import { styles } from './styles';

const CommentItem = (props) => {
    const { comments, responses } = props;

    return (
        comments.map((i) => {
            const itemId = i.id.replace('blogcomment_', '');
            const comment = i.comment || i.content;
            
            return (
                <>
                    <div>
                        <label>Username</label>
                        <div className="comment-input">
                            {i.username}
                        </div>
                    </div>

                    <div style={styles.comment}>
                        <label>Comment</label>
                        <div className="comment-message">
                            {comment}
                        </div>
                    </div>
                    
                    {responses &&
                        <ResponseItem
                            commentId={itemId}
                            responses={responses}
                        />
                    }

                    <div style={styles.answerBtnWrapper}>
                        <button
                            type="button"
                            style={styles.answerBtn}
                            onClick={() => props.onResponse(itemId)}
                        >Answer</button>
                    </div>
                    <hr className="hr-line"/>
                </>
            );
        })
    );
}

export default CommentItem;
