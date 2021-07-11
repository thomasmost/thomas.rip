/* eslint-disable camelcase */
const Twit = require('twit');
// const fetch = require('node-fetch');

require('dotenv').config();

const client = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET,
});

exports.handler = async (event /* context */) => {
  const body = JSON.parse(event.body);
  const { dataUrl } = body;
  // console.log(dataUrl);
  try {
    console.log('posting image');
    const res = await new Promise((resolve, reject) => {
      client.post(
        'media/upload',
        // 'media/upload.json?media_category=tweet_image',
        {
          media_data: Buffer.from(dataUrl, 'base64'),
        },
        async (err, data, response) => {
          if (err) {
            reject(err);
          }
          // const newdata = await response.json();
          // console.log(response);
          console.log('data');
          console.log(data && data.media_id_string);
          // console.log('response');
          // console.log(response);
          console.log('response status');
          console.log(response.statusCode);
          console.log(response.statusMessage);
          resolve(response);
        },
      );
    });
    // const res = await fetch(
    //   'https://upload.twitter.com/1.1/media/upload.json?media_category=tweet_image',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       Authorization: `OAuth oauth_consumer_key="${process.env.CONSUMER_KEY}",
    //       oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
    //       oauth_signature="tnnArxj06cWHq44gCs1OSKk%2FjLY%3D",
    //       oauth_signature_method="HMAC-SHA1",
    //       oauth_timestamp="1318622958",
    //       oauth_token="370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
    //       oauth_version="1.0"`,
    //     },
    //     body: {
    //       media_data: dataUrl,
    //     },
    //   },
    // );

    const { media_id, media_key } = res;
    console.log('made it!');
    // console.log(res);
    console.log(media_id, media_key);
    return { statusCode: 200, body: JSON.stringify({ media_id, media_key }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed uploading image' }),
    };
  }
};
