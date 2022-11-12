import React, { Component } from 'react';

import {ethers, Wallet} from "ethers";

const ERC20_ABI = require("./abi.json");

class Metamask extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
        };
    }



    async connectToMetamask() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);
        const balance = await provider.getBalance(accounts[0]);
        const balanceInEther = ethers.utils.formatEther(balance);
        const block = await provider.getBlockNumber();

        provider.on("block", (block) => {
            this.setState({ block })
        })

        const daiContract = new ethers.Contract('0x056fA7B4100d34c7fa9E8DB22C3DCd339b239927', ERC20_ABI, provider);
        const tokenName = await daiContract.name();
        const tokenBalance = await daiContract.balanceOf(accounts[0]);
        console.log(tokenBalance);

        this.setState({ selectedAddress: accounts[0], balance: balanceInEther, block, tokenName, tokenBalance, provider, daiContract })
    }

    async airdrop() {


        const walletPrivateKey = new Wallet("75a99226b84b72525af28ec0780b57f0e3f75e20d40cbd26603bb0a474e91dd1");
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x056fA7B4100d34c7fa9E8DB22C3DCd339b239927", ERC20_ABI, signer);
        const drop = await contract.airDrop();

        console.log(drop);

    }

    renderMetamask() {
        if (!this.state.selectedAddress) {
            return (
                <button onClick={() => this.connectToMetamask()}>Connect to Metamask</button>
            )
        } else {
            return (
                <div>
                    <p>Welcome</p>
                    <p>Your ETH account is: {this.state.selectedAddress}</p>
                    <p>Your ETH Balance is: {this.state.balance}</p>
                    <p>Current ETH Block is: {this.state.block}</p>
                    <p>Balance of {this.state.tokenName} is: {this.state.balance}</p>
                    <button onClick={() => this.airdrop()}>Air Drop to your account !</button>
                </div>
            );
        }
    }

    render() {
        return(
            <div>
                {this.renderMetamask()}
            </div>
        )
    }
}

export default Metamask;