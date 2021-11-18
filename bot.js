const BEARER = process.env.BEARER_TOKEN

require('custom-env').env('local')
var axios = require('axios');
const crypto = require('crypto')
const OAuth = require('oauth-1.0a')
const KEY = process.env.KEY
const SECRET = process.env.SECRET
const TOKEN_KEY = process.env.TOKEN_KEY
const TOKEN_SECRET = process.env.TOKEN_SECRET
console.log(TOKEN_KEY, TOKEN_SECRET)

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

  const manageTweetsUrl = 'https://api.twitter.com/2/tweets'


  const options = {
    url: "/2/tweets",
    method: "post",
    baseURL: "https://api.twitter.com/",
    headers: oauth.toHeader(oauth.authorize({ url: manageTweetsUrl, method: "POST" }, token)),
    data: {
        "text": `Hello World! ${Date.now()} #botstarter`,
    }
  }


setInterval(function() {axios.request(options).then((res)=> console.log(res))}, intervaltime);


