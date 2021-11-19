require('custom-env').env('local')

const axios = require('axios');
const crypto = require('crypto')
const OAuth = require('oauth-1.0a')

const KEY = process.env.KEY
const SECRET = process.env.SECRET
const TOKEN_KEY = process.env.TOKEN_KEY
const TOKEN_SECRET = process.env.TOKEN_SECRET

// Needed for some API calls, such as the spaces keyword search
// const BEARER = process.env.BEARER_TOKEN

const oauth = OAuth({
    consumer: { key: KEY, secret: SECRET },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto
        .createHmac('sha1', key)
        .update(base_string)
        .digest('base64')
    },
  })

  const token = {
    key: TOKEN_KEY,
    secret: TOKEN_SECRET,
}

  const baseURL = 'https://api.twitter.com/'
  const manageTweetsUrl = '/2/tweets'


  const options = {
    url: manageTweetsUrl,
    method: "post",
    baseURL: baseURL,
    headers: oauth.toHeader(oauth.authorize({ url: baseURL + manageTweetsUrl, method: "POST" }, token)),
    data: {
        "text": `Hello World! ${Date.now()} #botstarter`,
    }
  }

  const intervalTime = 300000

setInterval(function() {axios.request(options).then((res)=> console.log(res))}, intervalTime);


