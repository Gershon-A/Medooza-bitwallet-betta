let wallet = require('./lib/wallet');




try {
    setTimeout(async () => {
        let balance = await wallet.btc.createWallet('');
        console.log('BALANCE', balance);
    }, 3000)
}
catch (ex) {
    console.log(ex.message);
}