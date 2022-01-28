const Web3 = require("web3");
const fs = require("fs");
// Set Contract Abi
const contractJSON = JSON.parse(
  fs.readFileSync("./build/contracts/Token.json", "utf8")
);
var contractAbi = contractJSON.abi;

const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

//  Set Contract Address
var contractAddress = "0x04f93193aD05BDcA4C321B9F75e109982D6C6D15"; // Add Your Contract address here!!!

//  Set the Contract
var contract = new web3.eth.Contract(contractAbi, contractAddress);

// get all account
// web3.eth.getAccounts().then((accounts) => {
//   accounts.map((account) => {
//     // get all account balance
//     web3.eth.getBalance(account).then((bal) => {
//       // console.log(bal);
//     });
//   });
// });

// contract.properties
contract.methods
  .name()
  .call({ from: "0xa90DC15D04d7E021a032b134EA3fD70A1ff6213E" })
  .then(console.log);
