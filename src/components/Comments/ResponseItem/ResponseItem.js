import React from 'react';

import { rhythm } from '../../../utils/typography';


const ResponseItem = props => {
    const { commentId, responses} = props;

    const responsesItem = (comId, items) => {
        return (
            items.map((i) => {
                const relatedCommentId = i.commentId[0].dataUrl.split('/').pop();
                if(comId !== relatedCommentId){
                    return;
                }
                return (
                    <>
                        <div>
                            <label>Username</label>
                            <div className="comment-input">
                                {i.username}
                            </div>
                        </div>
    
                        <div style={{marginBottom: rhythm(1)}}>
                            <label>Comment</label>
                            <div className="comment-message">
                                {i.response || i.content}
                            </div>
                        </div>
                    </>
                );
            })
        );
    }

    return(
        <>
            {(commentId && responses) ?
                <section
                    className="response-wrapper"
                    style={{
                        width: '80%',
                        marginRight: 0,
                        marginLeft: 'auto',
                        marginTop: 10
                    }}
                >
                    {responsesItem(commentId, responses)}
                </section>
                : null
            }
        </>
    );
};

export default ResponseItem;
