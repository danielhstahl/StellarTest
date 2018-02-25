let request = require('request')
const {publicKey}=require('../secret.json')
request.get({
  url: 'https://horizon-testnet.stellar.org/friendbot',
  qs: { addr: publicKey },
  json: true
}, function(error, response, body) {
  if (error || response.statusCode !== 200) {
    console.error('ERROR!', error || body);
  }
  else {
    console.log('SUCCESS! You have a new account :)\n', body);
  }
})