import React from 'react';

const MessageBox = props => {
    return(
        <>
            <div className="comment-wrapper message-box">
                <h2>
                    Your message will apear in a time
                </h2>
                <button
                    type="button"
                    style={{cursor: 'pointer'}}
                    onClick={props.onClose}
                >Close</button>
            </div>
        </>
    );
};

export default MessageBox;
