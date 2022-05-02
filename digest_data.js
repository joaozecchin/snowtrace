const stAPI = require('./connector');
const fs = require(`fs`);
const address = "0x5b9ba1bf76ec0ecf56af70e918c95debb1811fa9"

let protocols ={
    yeti : {
        contract : '0xb715808a78f6041e46d61cb123c9b4a27056ae9c',
        category : 'lending'
    },
    benqi : {
        contract : '0x279f8940ca2a44c35ca3edf7d28945254d0f0ae6',
        category : 'lending deposit'
    },
    avve : {
        contract : '0x625e7708f30ca75bfd92586e17077590c60eb4cd',
        category : 'lending deposit'
    },
    nullAddress : {
        contract : '0x0000000000000000000000000000000000000000',
        category : 'mint'
    },
    avaxUsdcJLP : {
        contract : '0xf4003f4efbe8691b60249e6afbd307abe7758adb',
        category : 'lp'
    },
    avaxMimJLP : {
        contract : '0x781655d802670bba3c89aebaaea59d3182fd755d',
        category : 'lp'
    },
    farmJLP : {
        contract : '0xd04b43a8e016ead5c95971e428bffe5a32cfad3c',
        category : 'staking'
    },
    impermaxColateral : {
        contract : '0x0c31e9364d2139a8976ead3a4259c19b7ed0a41d',
        category : 'lending deposit'
    },
    joeSwapRouter : {
        contract : '0x60ae616a2155ee3d9a68541ba4544862310933d4',
        category : 'exchange'
    },
    avaxUsdceJLP : {
        contract : '0xa389f9430876455c36478deea9769b7ca4e3ddb1',
        category : 'lp'
    },
    joeStaking : {
        contract : '0xc05227adce1a291752e90bc989f71c4c534d26d5',
        category : 'staking'
    },
    benqiUSDMinter : {
        contract : '0xb715808a78f6041e46d61cb123c9b4a27056ae9c',
        category : 'exchange'
    },
    yetiUSDCVault : {
        contract : '0xb775cb337cf223708ef053a110b56e4dabb78132',
        category : 'staking'
    },
    yetiJLPVault : {
        contract : '0x9ef73eacae3b4143ca8a637a16f178f4bdce65a0',
        category : 'lending deposit'
    },
    yetiIssuer : {
        contract : '0x000000000bcd46cdd5a6e92c885b34ceac6d2ff4',
        category : 'rewards'
    },
    yetiStabilityPool : {
        contract : '0xfffffffffff5d3627294fec5081ce5c5d7fa6451',
        category : 'staking'
    },
    impermaxUSDCAVAXColateral : {
        contract : '0xee2a27b7c3165a5e2a3feb113a77b26b46db0bae',
        category : 'lending deposit'
    },
    impermaxRouter : {
        contract : '0x3039c26f9126833baca8edbf61c761cd909f461f',
        category : 'lending borrow'
    },
    pangolinAvaxUsdcaLP : {
        contract : '0x0e0100ab771e9288e0aa97e11557e6654c3a9665',
        category : 'lp'
    },
    pangolinRouter : {
        contract : '0xe54ca86531e17ef3616d22ca28b0d458b6c89106',
        category : 'exchange'
    },
    pangolinUsdcUstLP : {
        contract : '0x3c0ecf5f430bbe6b16a8911cb25d898ef20805cf',
        category : 'lp'
    },
    pangolinAvaxUstLP : {
        contract : '0xdeaBb6e80141F5E557EcBDD7e9580F37D7BBc371',
        category : 'lp'
    },
    farmPangolinAvaxUstLp : {
        contract : '0xc6e68d77d0f4fa925a1cf2611dab6b10900eaf2b',
        category : 'staking'
    },
    farmPangolinUsdcUstFarm : {
        contract : '0x69c1c44e8742b66d892294a7eeb9aac51891b0eb',
        category : 'staking'
    },
    pangolinAvaxUsdceLP : {
        contract : '0xbd918ed441767fe7924e99f6a0e0b568ac1970d9',
        category : 'lp'
    },
    yetiSJoeVault : {
        contract : '0xcc3ee7ccb14aea851850f46cbbe4d82f5d74c20f',
        category : 'reward'
    },
    yetiStaking : {
        contract : '0x88888888847df39cf1dfe1a05c904b4e603c9416',
        category : 'staking'
    },
    joeUsdcJLP : {
        contract : '0x67926d973cd8ee876ad210faaf7dffa99e414acf',
        category : 'lp'
    },
    yetiQuiUsdcnVault : {
        contract : '0x9a6bceceec3fbe2facc977e57fbe2508f70dbcd9',
        category : 'lending deposit'
    },
    wallet : {
        contract : '0x5b9ba1bf76ec0ecf56af70e918c95debb1811fa9',
        category : 'wallet'
    },
    farmPangolinUsdcUst : {
        contract : "0xdeaBb6e80141F5E557EcBDD7e9580F37D7BBc371",
        category : "lp"
    }
}

/*
(async () => {
    await stAPI.getData()
    let fileData = fs.readFileSync(`avax-wallet.json`)
    let wallet = JSON.parse(fileData)

    console.log(wallet)
})();
*/

let fileData = fs.readFileSync(`avax-wallet.json`)
let wallet = JSON.parse(fileData)

let sentTo = {}

for(let id in wallet.transactions){
    let trans = wallet.transactions[id]
    let symbol = trans.tokenSymbol
    let value = parseInt(trans.value) / (10**parseInt(trans.tokenDecimal))

    if(!(trans.to in sentTo)){

        sentTo[trans.to] = {}
        sentTo[trans.to]['tokens'] = {}
        sentTo[trans.to]['tokens'][symbol] = -value
    }else{
        if(trans.tokenSymbol in sentTo[trans.to]['tokens']){
            sentTo[trans.to]['tokens'][trans.tokenSymbol] -= value
        }else{
            sentTo[trans.to]['tokens'][trans.tokenSymbol] = - value
        } 
    }

    if(!(trans.from in sentTo)){
        sentTo[trans.from] = {}
        sentTo[trans.from]['tokens'] = {}
        sentTo[trans.from]['tokens'][symbol] = value
    }else{
        if(trans.tokenSymbol in sentTo[trans.from]['tokens']){
            sentTo[trans.from]['tokens'][trans.tokenSymbol] += value
        }else{
            sentTo[trans.from]['tokens'][trans.tokenSymbol] = value
        }
    }
}

for(contract in sentTo){
    for(proto in protocols){
        if(protocols[proto]['contract']==contract){
            sentTo[contract]['name'] = proto
            sentTo[contract]['category'] = protocols[proto]['category']
        }
    }
}

//console.log(sentTo)
let fileArchive  = JSON.stringify(sentTo)
fs.writeFileSync('avax-balances.json', fileArchive)


let tokenBalance = {}
for(proto in sentTo){
    let protoBalances = sentTo[proto]['tokens']
    for(token in protoBalances){
        if(!(token in tokenBalance)){
            tokenBalance[token] = protoBalances[token]
        }else{
            tokenBalance[token] += protoBalances[token]
        }
    }
}

//console.log(tokenBalance)


