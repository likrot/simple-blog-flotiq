const axios = require('axios');

export async function handler(event) {
    const apiToken = process.env.GATSBY_FLOTIQ_API_KEY;
    const apiUrl = process.env.GATSBY_FLOTIQ_API_URL;
    const postId = event.queryStringParameters.postId;

    if(!apiToken){
        return {
        statusCode: 400,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ success: false, message: 'error' }),
        }
    }

    let responseComments = null;
    let responseResponses = null;
    const filters = encodeURIComponent(`{"postId[*].dataUrl":{"type":"contains","filter":"/api/v1/content/blogpost/${postId}"}}`);
    const requestUrl = `${apiUrl}content/blogcomment?filters=${filters}&order_by=internal.createdAt`;

    try {
        const result = await axios.get(requestUrl, {
            headers: {
                'X-AUTH-TOKEN': apiToken,
                "Accept": "application/json",
            },
        });

        if(result.status !== 200){
            return {
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ success: false, message: 'error' }),
            }
        }
        responseComments = result.data;

        const filtersResp = encodeURIComponent(`{"postId[*].dataUrl":{"type":"contains","filter":"/api/v1/content/blogpost/${postId}"}}`);
        const requestUrlResp = `${apiUrl}content/blogcommentresponse?filters=${filtersResp}&order_by=internal.createdAt&auth_token=${apiToken}`;

        const resultResp = await axios.get(requestUrlResp, {
            headers: {
                'X-AUTH-TOKEN': apiToken,
            }
        });
    
        if(resultResp.status !== 200){
            return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ success: false, message: 'error' }),
            }
        }
        responseResponses = resultResp.data;
    
    } catch (error) {
        console.log('[fetchComment -- error]', error.message);
        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ success: false, message: 'error' }),
        }
    }

    if(!responseComments){
        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ success: false, message: 'error' }),
        }
    }

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            success: true,
            message: 'message',
            data: {
            comments: responseComments.data,
            responses: responseResponses.data
            },
        }),
    }
}