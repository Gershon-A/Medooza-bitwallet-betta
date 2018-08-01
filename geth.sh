#!/usr/bin/bash
echo "Starting geth"
screen -dmS /usr/bin/geth --testnet --rpc --rpcport 8545 --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3  --verbosity 3
