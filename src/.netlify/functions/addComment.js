const axios = require('axios');
const uniqid = require('uniqid');

export async function handler(event) {
  const apiToken = process.env.GATSBY_FLOTIQ_API_KEY;
  const apiUrl = process.env.GATSBY_FLOTIQ_API_URL;
  const data = JSON.parse(event.body);

  if(!data || !apiToken){
    return {
      statusCode: 404,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: false, message: 'error' }),
    }
  }
  
  const payload = data.value;
  const postId = data.postId;

  const commentId = data.commentId || '';

  if(!payload || !postId){
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: false, message: 'error' }),
    }
  }
  const weekJedi = payload.weekjedi || null;

  if(weekJedi){
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: false, message: 'error'}),
    }
  }

  const checkedComment = (payload.comment && payload.comment.length > 1000) ? payload.comment.substr(0, 1000) : payload.comment;
  const checkedUsername = (payload.username && payload.username.length > 40) ? payload.username.substr(0, 40) : payload.username;
  const checkedEmail = (payload.email && payload.email.length > 50) ? payload.email.substr(0, 50) : payload.email;

  const genId = uniqid('blogcomment-');
  const commentData = {
      id: genId,
      email: checkedEmail || '',
      postId: [
          {
              type: 'internal',
              dataUrl: `/api/v1/content/blogpost/${postId}`
          }
      ],
      content: checkedComment || '',
      username: checkedUsername,
  };

  const genId2 = uniqid('blogcommentresponse-');
  const responseData = {
      id: genId2,
      email: checkedEmail || '',
      postId: [
          {
              type: 'internal',
              dataUrl: `/api/v1/content/blogpost/${postId}`
          }
      ],
      commentId: [
          {
              type: 'internal',
              dataUrl: `/api/v1/content/blogcomment/${commentId}`
          }
      ],
      content: checkedComment,
      username: checkedUsername,
  };

  const urlD = commentId ? 'blogcommentresponse' : 'blogcomment';
  const urlDa = commentId ? responseData : commentData;

  try {
    const result = await axios({
        method: 'POST',
        url: `${apiUrl}content/${urlD}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': apiToken
        },
        data: JSON.stringify(urlDa)
    });

    if(result.status === 200){
        const response = result.data;

        if(response.id){
            return {
              statusCode: 200,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ success: true, message: 'message', data: response.data }),
            }
        }

        return {
          statusCode: 400,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ success: false, message: 'error', data: response }),
        }
    }else{

      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ success: false, message: 'error' }),
      }
    }
  } catch (error) {
    console.log('[addComment -- error]', error.message);
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: false, message: 'error' }),
    }
  }
}