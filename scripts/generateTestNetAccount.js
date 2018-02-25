let request = require('request')
const fs=require('fs')
const dir='./keys'
fs.readdir(dir, (err, filenames)=>{
  if (err) {
    console.error(err)
    return
  }
  filenames.forEach(filename=>{
    fs.readFile(`${dir}/${filename}`, 'utf-8', (err, content)=>{
      if (err) {
        console.error(err)
        return
      }
      const {publicKey}=JSON.parse(content)
      request.get({
          url: 'https://horizon-testnet.stellar.org/friendbot',
          qs: { addr: publicKey },
          json: true
        }, (error, response, body) =>{
          if (error || response.statusCode !== 200) {
            console.error('ERROR!', error || body);
          }
          else {
            console.log(`SUCCESS! You have a new account corresponding with ${publicKey}`, body);
          }
      })
    })
  })
})
