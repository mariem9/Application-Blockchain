require('@nomiclabs/hardhat-waffle')
require('dotenv').config({path: '.env'})
module.exports = {
  solidity: '0.8.4',
  networks: {
  goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/N3lgB12kjevwHeh-5pC2MvJe9hIifrRR',
      accounts: [
        '9b092edcc331fd89aabfa270e2a2271dc37b86242956d21dd3a0db1c048475bd'
      ],
    },
  },
}
