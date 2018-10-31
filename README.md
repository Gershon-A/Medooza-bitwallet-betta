# Medooza-bitwallet-betta
Web wallet betta
# WalletFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 5.6.0 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Start Ethereum
geth --testnet --rpc --rpcport 8545 --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3

## Allow testing by remote IP
\frontend\src\app\core\env.config.ts
const apiURI = _isDev ? 'http://142.93.40.185:3000/api/' : `/api/`;

### Services ######
# Start mongo
sudo service mongod start
# Start backend/api
sudo service wallet-api status
# Logging
$ journalctl -e -u wallet-api.service
$ journalctl -u wallet-api.service -f 
$ journalctl -u wallet-api.service --since 08:00
$ journalctl -u wallet-api.service --since today
$ journalctl -u wallet-api.service --since yesterday
$ journalctl -u wallet-api.service --since 2016-06-02 15:36:00
# Start bitcoin 18332
bitcoind -daemon -datadir=/mnt/volume_lon1_01/.bitcoin
litecoind -daemon -testnet
# Strat Litecoin 19332q
//litecoind -daemon -datadir=/mnt/volume_lon1_01/.litecoin -testnet
litecoind -daemon -testnet
# Start bitcoinCashe
bitcoinCashd -daemon -testnet -datadir=/home/dev/.bitcoinCash -port=18222

# The last
geth service : /lib/systemd/system/geth.service
start bitcoin : bitcoind -datadir=/mnt/volume_lon1_01/.bitcoin -daemon -testnet
start bitcoincash : bitcoinCashd -daemon -datadir=/mnt/volume_lon1_01/.bitcoinCash -testnet
start litecoin : litecoind -daemon -datadir=/mnt/volume_lon1_01/.litecoin -testnet
Bitcoin config : /mnt/volume_lon1_01/.bitcoin/bitcoin.conf
daemon=1
server=1
listen=1
testnet=1
rpcuser=bit_user
rpcpassword=12345678

BitcoinCash config : /mnt/volume_lon1_01/.bitcoinCash/bitcoin.conf
daemon=1
server=1
listen=0
testnet=1
rpcuser=bit_user
rpcpassword=12345678
rpcport=18222

Litecoin config : /mnt/volume_lon1_01/.litecoin/litecoin.conf
daemon=1
server=1
listen=1
testnet=1
rpcuser=bit_user
rpcpassword=12345678
 ### Bitcoin-cli
root@wallet:~# bitcoin-cli -testnet -rpcpassword=12345678 -rpcuser=bit_user getbalance
5.70320765
root@wallet:~# bitcoin-cli -testnet -rpcpassword=12345678 -rpcuser=bit_user getbalance 
0.00000000
root@wallet:~# bitcoin-cli -testnet -rpcpassword=12345678 -rpcuser=bit_user getmininginfo
 ### nginx frontend
 #server {
  #listen 4200;
  #listen [::]:4200;

  #server_name bitwallet.medooza.network;
  #  root           /home/dev/frontend/dist;
  #  index          index.html;
  #  try_files $uri /index.html;


#}
server {
# To compiled distributed version
  listen 8880;
  listen [::]:8880;

  server_name bitwallet.medooza.network;
    root           /home/dev/frontend/dist;
    index          index.html;
    try_files $uri /index.html;

location @app {
  proxy_pass http://localhost:3000$request_uri;
}

location / {
  try_files $uri $uri/ @app;
  error_page 405 @app;
}

}
server {
  listen 8080;
  listen [::]:8080;

  server_name bitwallet.medooza.network;

  location / {
      proxy_pass http://localhost:3000/;
      proxy_buffering off;
      proxy_set_header X-Real-IP $remote_addr;


  }
}
# Bitcoin
server {
  listen 8081;
  listen [::]:8081;

  server_name bitwallet.medooza.network;

  location / {
      proxy_pass http://localhost:18332/;
      proxy_buffering off;
      proxy_set_header X-Real-IP $remote_addr;


  }
}
# Bitcoin chache
server {
  listen 8082;
  listen [::]:8082;

  server_name bitwallet.medooza.network;

  location / {
      proxy_pass http://localhost:18222/;
      proxy_buffering off;
      proxy_set_header X-Real-IP $remote_addr;


  }
}
# Litecoin
server {
  listen 8083;
  listen [::]:8083;

  server_name bitwallet.medooza.network;

  location / {
      proxy_pass http://localhost:19332/;
      proxy_buffering off;
      proxy_set_header X-Real-IP $remote_addr;


  }
}
#EtH
server {
  listen 8084;
  listen [::]:8084;

  server_name bitwallet.medooza.network;

  location / {
      proxy_pass http://localhost:8545/;
      proxy_buffering off;
      proxy_set_header X-Real-IP $remote_addr;


  }
}
