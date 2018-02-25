const StellarSdk=require('stellar-sdk')
const primary=require('./keys/primary.json')
const secondary=require('./keys/secondary.json')

StellarSdk.Network.useTestNetwork()
let server = new StellarSdk.Server('https://horizon-testnet.stellar.org')
const sourceKeys = StellarSdk.Keypair.fromSecret(primary.secret)

const checkAccount=accountKey=>{
    return server.loadAccount(accountKey).then(account=>{
        console.log('Balances for account: ' + accountKey)
        account.balances.forEach(balance=>{
            console.log('Type:', balance.asset_type, ', Balance:', balance.balance)
        })
        return 
    })
}

const sendMoney=(destinationAccount, amount)=>{
    return server.loadAccount(destinationAccount).catch(StellarSdk.NotFoundError, err=>{
        throw new Error('Account does not exist!  You will not be charged a transaction fee')
    }).then(()=>{
        return server.loadAccount(primary.publicKey)
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

checkAccount(primary.publicKey).then(()=>sendMoney(secondary.publicKey, '50')).then(()=>{
    checkAccount(primary.publicKey)
    checkAccount(secondary.publicKey)
})