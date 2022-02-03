import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import Token from "./contracts/Token.json";
import "./App.css";

class App extends Component {
  state = {
    tokenName: '',
    myBalance: 0,
    myAddress: '',
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    reciverAddress: '',
    sendingTokens: 0
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Token.networks[networkId];
      const instance = new web3.eth.Contract(
        Token.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.getInfo);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };



  sendCoin = async (event) => {
    event.preventDefault();
    console.log(this.state.reciverAddress);
    console.log(this.state.sendingTokens);
    if (this.state.reciverAddress === '' || this.state.sendingTokens === 0) { } else {
      const { accounts, contract } = this.state;
      let respons = await contract.methods.transfer(this.state.reciverAddress, this.state.sendingTokens).send({ from: accounts[0] })
      console.log(respons);
      this.getInfo()
    }
  }

  getInfo = async () => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.name.call();
    this.setState({ myAddress: accounts[0] });

    contract.methods.balanceOf(accounts[0]).call().then((balance) => {
      let bal = parseInt((balance / 1000000000000000000)).toFixed(18)
      this.setState({ myBalance: bal });
    })
    let result = contract.methods.name.call().call((error, result) => {
      console.log(result);
      this.setState({ tokenName: result });
    });
    console.log(response);

  }
  render() {
    if (!this.state.web3) {
      return (
        <div className="bg-white w-full h-screen flex justify-center items-center">
          Loading Web3, accounts, and contract...
        </div>
      );
    }
    return (
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              {this.state.tokenName}
            </h2>
            <p className="mt-5 text-xl text-gray-400">
              Your Address is: {this.state.myAddress}
            </p>
            <p className="mt-5 text-xl text-gray-400">
              Your Balance is: {this.state.myBalance}
            </p>
          </div>
          <div className="mt-10 w-full max-w-xs">
            <label htmlFor="currency" className="block text-base font-medium text-gray-300">
              Send Token
            </label>
            <div className="mt-1.5 relative">

              <form action="" method="POST" className="grid grid-cols-1 gap-y-6" onSubmit={this.sendCoin}>
                <div>
                  <label htmlFor="full-name" className="sr-only">
                    Tokens
                  </label>
                  <input
                    type="text"
                    onChange={(e) => this.setState({ sendingTokens: e.target.value })}
                    autoComplete="name"
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    placeholder="Send Tokens"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">
                    Address
                  </label>
                  <textarea

                    rows={4}
                    className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                    placeholder="Reciver Address"
                    defaultValue={''}
                    onChange={(e) => this.setState({ reciverAddress: e.target.value })}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
