# Heimdall

Web3 Cardano Token is a new way to authenticate users. A replacement for JWT in hybrid dApps.

## Note

This repository is initially rewritten in Typescript from [https://github.com/pyropy/web3-cardano-token](https://github.com/pyropy/web3-cardano-token). gavin-harris made a great contribution to ...

## Install

```bash
npm i heimdall
# or
yarn add heimdall
```

## Usage

### Client Side

```javascript
import Web3Token from 'heimdall/dist/browser'

async function getWeb3Token (walletApi) {
  const addresses = await walletApi.getUsedAddresses()

  if (!addresses || addresses.length === 0) {
    throw new Error('No wallet address')
  }

  return await Web3Token.sign(async (msg) => {
    return await walletApi.signData(addresses[0], Buffer.from(msg).toString('hex'))
  })
}
```

### Server Side

```javascript
import Web3Token from 'heimdall/dist/node'

// getting token from authorization header ... for example
const token = req.headers.authorization

const { address, body } = await Web3Token.verify(token)

// now you can find that user by his address
// (better to do it case insensitive)
const user = await User.findOne({ address })
// ...
```
