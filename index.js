const Web3 = require("web3");
const fs = require("fs");
// Set Contract Abi
const contractJSON = JSON.parse(
  fs.readFileSync("./build/contracts/Token.json", "utf8")
);
var contractAbi = contractJSON.abi;

const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

//  Set Contract Address
var contractAddress = "0x7241451F89E522D70C460aaEe12558C27bc77035"; // Add Your Contract address here!!!

//  Set the Contract
var contract = new web3.eth.Contract(contractAbi, contractAddress);

// get all account
web3.eth.getAccounts().then((accounts) => {
  accounts.map((account) => {
// contract.methods
//   .balanceOf(account)
//   .call({ from: contractAddress })
//   .then(console.log);

    // get all account balance
    // web3.eth.getBalance(account).then((bal) => {
      // console.log(bal);
    // });
  });
});
contract.methods.balanceOf('0xa90DC15D04d7E021a032b134EA3fD70A1ff6213E').call().then(function (balance) {
        console.log(balance);
})