const StellarSdk=require('stellar-sdk')
const {publicKey}=require('./secret.json')

let server = new StellarSdk.Server('https://horizon-testnet.stellar.org')
// the JS SDK uses promises for most actions, such as retrieving an account
server.loadAccount(publicKey).then(account=>{
  console.log('Balances for account: ' + publicKey)
  account.balances.forEach(balance=>{
    console.log('Type:', balance.asset_type, ', Balance:', balance.balance)
  })
})