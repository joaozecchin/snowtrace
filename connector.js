const axios = require('axios');
const fs = require('fs');
const address = "0x5b9ba1bf76ec0ecf56af70e918c95debb1811fa9"
const startBlock = "0"
let now = Math.round((Date.now()/1000)).toString()
let currentBlock

let urlBook = {
    getBalance : 'https://api.snowtrace.io/api?module=account&action=balance&address='+ address +'&apikey=YourApiKeyToken',
    getTransfers : 'https://api.snowtrace.io/api?module=account&action=tokentx&address='+ address +'&startblock='+ startBlock +'&endblock='+ currentBlock +'&sort=asc&apikey=YourApiKeyToken',
    getBlockByTime : 'https://api.snowtrace.io/api?module=block&action=getblocknobytime&timestamp='+ now +'&closest=before&apikey=YourApiKeyToken'
}




currentBlock = callAPI(urlBook.getBlockByTime)

function callAPI(url){
    let promise = axios.get(url)
    let dataPromise = promise.then((res) => res.data)
    return dataPromise
}

async function getData(){
    let walletData = {}

    let transactions = await callAPI(urlBook.getTransfers)
    //console.log(transactions)
    let result = transactions.result
    //console.log(result)
    walletData["transactions"] = result
    //console.log(result)

    let balance = await callAPI(urlBook.getBalance)
    walletData["native_balance"] = balance.result/1000000000000000000

    //console.log(walletData)
    let fileData = JSON.stringify(walletData)
    fs.writeFileSync('avax-wallet.json', fileData)
    return walletData
}
getData()

exports.getData = getData

