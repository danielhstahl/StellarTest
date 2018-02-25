const StellarSdk=require('stellar-sdk')
const fs=require('fs')
const [, , accountName]=process.argv
if(!accountName){
    console.error('Requires name of account!')
}
else{
    let pair = StellarSdk.Keypair.random()
    fs.writeFile(`./keys/${accountName}.json`, JSON.stringify({
        publicKey:pair.publicKey(),
        secret:pair.secret()
    }), err=>{
        if(err){
            console.log(err)
        }
    })
}

