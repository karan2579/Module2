# ETH + AVAX Function Frontend 
This is a simple Solidity smart contract named "Assessment" that allows the contract owner to manage a balance and perform deposit and withdrawal operations.

## Features

- **Deposit**: The contract owner can deposit additional funds into the contract by using the `deposit` function. This increases the contract's balance.

- **Withdraw**: The contract owner can withdraw funds from the contract using the `withdraw` function. This decreases the contract's balance. If the contract balance is insufficient, an error will be thrown.

- **Balance**: The current balance of the contract can be checked using the `getBalance` function.

- **Order Management**: The contract has an `Order` variable that can be incremented or decremented using the `increment` and `decrement` functions, respectively.

## Getting Started
To use this smart contract, you need a development environment [ReamixIDE](https://remix.ethereum.org/) with the Solidity compiler version 0.8.16.

## Setup

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/


## Authors
Abhigyan Pushkar

## License

This project is licensed under the [MIT] License.
