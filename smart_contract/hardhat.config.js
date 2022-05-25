require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: ALCHELY_API_URL,
      accounts: [
        WALLET_PRIVATE_KEY
      ],
    },
  },
}
