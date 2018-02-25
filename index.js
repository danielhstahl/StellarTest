const StellarSdk=require('stellar-sdk')
const {publicKey, secret}=require('./secret.json')

StellarSdk.Network.useTestNetwork()
let server = new StellarSdk.Server('https://horizon-testnet.stellar.org')
const sourceKeys = StellarSdk.Keypair
  .fromSecret(secret)
// the JS SDK uses promises for most actions, such as retrieving an account
server.loadAccount(publicKey).then(account=>{
  console.log('Balances for account: ' + publicKey)
  account.balances.forEach(balance=>{
    console.log('Type:', balance.asset_type, ', Balance:', balance.balance)
  })
})

const sendMoney=(destinationAccount, amount)=>{
    server.loadAccount(destinationAccount).catch(StellarSdk.NotFoundError, err=>{
        throw new Error('Account does not exist!  You will not be charged a transaction fee')
    }).then(()=>{
        return server.loadAccount(publicKey)
    }).then(account=>{
        let transaction=new StellarSdk.TransactionBuilder(account).addOperation(StellarSdk.Operation.payment({
            destination:destinationAccount,
            asset:StellarSdk.Asset.native(),
            amount
        })).addMemo(StellarSdk.Memo.text('TestNet')).build()
        transaction.sign(sourceKeys)
        return server.submitTransaction(transaction)
    }).then(result=>{
        console.log('Successfully sent:', result)
    }).catch(err=>{
        console.error('Something went wrong', err)
    })
}
