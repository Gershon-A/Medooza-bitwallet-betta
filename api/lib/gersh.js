
let config = require('config');
let Web3 = require('web3');
let web3 = new Web3(config.get('contracts.gersh.web3Uri'));
//let web4 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8545"));


const getContract = (from) => {
    return new web3.eth.Contract(
        require('../config/gersh.json'),
        config.get('contracts.gersh.address'),
        { gas: config.get('contracts.gersh.gas'), from }
    );
};
const getBalance = async (address) => {
    const ctx = getContract(address);
    console.log("BALANCE OF = ", address);
    const promise = await new Promise((rs, rj) => {
        ctx.methods.balanceOf(address).call(function (err, res) {
            //console.log("BALANCE OF ERRR= ", err.message)
            if (err) rs(0);
            else {
                res = res / 1000000000000000000;
                //res = res ;
                rs(res);
            }
        });
    });
    return promise;
};
const unlockAddress = async (address, password) => {
    console.log("address OF = ", address);
    console.log("password OF = ", password);
    return await await new Promise((rs, rj) => {
        web3.eth.personal.unlockAccount(
            address,
            password,
            config.get('contracts.gersh.unlocktime'),
            async (err, res) => {
                if (err) rj(err);
                else rs(res);
            })
    });
};
const transferAmount = async (address,to ,amount, options) => {
    console.log("amount OF = ", amount);
    const ctx = getContract(address);
    const unlocked = await unlockAddress(address, options.password);
    const promise = new Promise((rs, rj) => {
        ctx.methods.transfer(options.address, 1000000000000000000 * (amount)).send(function (err, res) {
            if (err) rj(err);
            else rs(res);
        });
    });
    return promise;
};
module.exports = { getBalance, transferAmount };