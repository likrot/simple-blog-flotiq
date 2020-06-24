const axios = require('axios');

export async function handler(event) {
    const googleSecretKey = process.env.GATSBY_GOOGLE_RECATPCHA_SECRET_KEY;
    const token = event.queryStringParameters.googleToken;

    try {
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${googleSecretKey}&response=${token}`;
        const resultGoogle = await axios.post(url);

        let google_response = null;
        let google_validated = false;
        if(resultGoogle.status === 200){
            google_response = await resultGoogle.data;
            if(google_response.success === true){
                google_validated = true;
            }
        }
        return {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ success: true, message: 'success', data: {
              googleResponse: google_validated
          } }),
        }
    } catch (error) {
        console.log('[chalangeCaptcha -- error]', error.message);
        return {
            statusCode: 400,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ success: false, message: 'error' }),
        }
    }
  }