require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "-4o6bxd0aE5q0jVFQtFhIX0sX5s4BhPV";

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = "75a99226b84b72525af28ec0780b57f0e3f75e20d40cbd26603bb0a474e91dd1";

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: "UEV8JHTQURR1HCFQMZYQ7WNFUCIFKF7G67"
  }
};