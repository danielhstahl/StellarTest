const StellarSdk=require('stellar-sdk')
const fs=require('fs')
let pair = StellarSdk.Keypair.random()
fs.writeFile('./secret.json', JSON.stringify({
    publicKey:pair.publicKey(),
    secret:pair.secret()
}), err=>{
    if(err){
        console.log(err)
    }
})
