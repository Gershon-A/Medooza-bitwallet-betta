
let config = require('config');
let Web3 = require('web3');
let web4 = new Web3(config.get('contracts.gersh.web3Uri'));
const getContract = (from) => {
    return new web4.eth.Contract(
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
                res = res / 100000000;
                rs(res);
            }
        });
    });
    return promise;
};
const unlockAddress = async (address, password) => {
    return await await new Promise((rs, rj) => {
        web4.eth.personal.unlockAccount(
            address,
            password,
            config.get('contracts.gersh.unlocktime'),
            async (err, res) => {
                if (err) rj(err);
                else rs(res);
            })
    });
};
const transferAmount = async (address, pwd, options) => {
    const ctx = getContract(address);
    const unlocked = await unlockAddress(address, pwd);
    const promise = new Promise((rs, rj) => {
        ctx.methods.transfer(options.address, 100000000 * (options.amount)).send(function (err, res) {
            if (err) rj(err);
            else rs(res);
        });
    });
    return promise;
};
module.exports = { getBalance, transferAmount };