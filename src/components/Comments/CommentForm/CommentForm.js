import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import Loader from '../../Loader/Loader';

const initialValues = {
    email: '',
    username: '',
    comment: ''
};

const CommentForm = props => {
    const { commentId, onFormSubmit } = props;
    const [isSending, setIsSending] = useState(false);

    const { executeRecaptcha } = useGoogleReCaptcha();

    const clickHandler = async () => {
        if (!executeRecaptcha) {
            return false;
        }
        const response = await executeRecaptcha('comment');
        
        const responseChalange = await fetch(`/.netlify/functions/chelangeReCaptcha?googleToken=${response}`);
        const result = await responseChalange.json();
    
        if(result && result.success === true){
            return result.data.googleResponse;
        }
        return false;
    };

    const onSubmitHandler = async (value) => {
        const tokenResponse = await clickHandler();
        if(!tokenResponse){
            return false;
        }

        const postId = props.postId;
        const payload = {
            value,
            postId: postId,
            commentId: commentId,
        }
        
        try {
            setIsSending(true);
            const result = await fetch('/.netlify/functions/addComment', {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            const response = await result.json();
            setIsSending(false);
            if(result.status === 200){
                if(response.success === true){
                    onFormSubmit();
                    return true;
                }
            }else{
                console.log('[error on add]');
            }
            return false;
        } catch (error) {
            setIsSending(false);
            console.log('[addComment -- error]', error.message);
            return false;
        }
    }

    const validate = (value) => {
        const errors = {};
        if(!value.username) errors.username = 'Username is required!';
        if(!value.comment) errors.comment = 'Comment is required!';
        if(value.username && value.username.length > 50) errors.username = 'Max limit is 50 characters!';
        if(value.email && value.email.length > 40) errors.email = 'Max limit is 40 characters!';
        if(value.comment && value.comment.length > 1000) errors.comment = 'Max limit is 1000 characters!';
        return errors;
    }

    return (
        <div>
            {isSending ? (
                <div className="comment-wrapper">
                    <Loader />
                </div>
            )
                :
                (
                    <Form
                        initialValues={initialValues}
                        onSubmit={onSubmitHandler}
                        validate={validate}
                        render={({ handleSubmit, form, invalid }) => (
                            <form
                                name="comment-form"
                                onSubmit={async event => {
                                    const aw = await handleSubmit(event);
                                    if(aw){form.reset()}
                                }}
                            >
                                <div>
                                    <Field
                                        name="username"
                                        render={({input, meta}) => (
                                            <>
                                                <label>Username</label>
                                                <div className="form-input--wrapper">
                                                    <input
                                                        {...input}
                                                        type="text"
                                                        placeholder="Username"
                                                    />
                                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                                </div>
                                            </>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Field
                                        name="email"
                                        render={({input, meta}) => (
                                            <>
                                                <label>Email</label>
                                                <div className="form-input--wrapper">
                                                    <input
                                                        {...input}
                                                        type="text"
                                                        placeholder="Email Address"
                                                    />
                                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                                </div>
                                            </>
                                        )}
                                    />
                                </div>

                                <h2>{!commentId ? 'Comment' : 'Response'}</h2>
                                <Field
                                    name="comment"
                                    render={({ input, meta }) => (
                                        <div>
                                            <label>Text</label>
                                            <div className="form-input--wrapper">
                                                <textarea {...input} />
                                                {meta.touched && meta.error && <span>{meta.error}</span>}
                                            </div>
                                        </div>
                                    )}
                                />

                                <div style={{ display: 'none' }}>
                                    <label>Week Jedi</label>
                                    <Field name="weekjedi" component="input" placeholder="Week Jedi message"/>
                                </div>

                                <button
                                    type="submit"
                                    style={{cursor: 'pointer'}}
                                >Submit</button>
                            </form>
                        )}
                    />
                )
            }
        </div>
    );
};

export default CommentForm;
