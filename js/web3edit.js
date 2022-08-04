//Get search query param
const urlParams = new URLSearchParams(window.location.search);
const qrystalID = urlParams.get('id')
//
//Web3 functions
const contract_address= "0x7FC448A703Ec1Fd740897e160F913669379516F2";
var contract_abi = '';

//Fetch ABI
fetch('../qrystals.json')
.then(res => res.text())
.then(data => {contract_abi = JSON.parse(data); initweb3();})

var accounts;
var qrystalContract;

// async function initweb3() {
//     if (window.ethereum != null) {
//     web3 = new Web3(window.ethereum)
//     }
//     else{
//         //alert('Couldn\'t load web3 wallet. Try accessing this page from a desktop with a web3 browser connected to a wallet.')
//         web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/d294fcd3bc584b77ae8f1ef4b19b1a5c"))
//     }
//     try {
//         // Request account access if needed
//         await window.ethereum.enable()
//         //Access account
//         accounts = await web3.eth.getAccounts();
//         window.ethereum.on('accountsChanged', function (accounts) {
//             accounts = web3.eth.getAccounts();
//         });
//         qrystalContract = new web3.eth.Contract(contract_abi, contract_address);                 
//     } catch (error) {
//         alert(error);
//     }
// }

async function initweb3() {
    if (window.ethereum) {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        window.web3 = new Web3(window.ethereum);
        try{
        //Access accounts
        accounts = await window.web3.eth.getAccounts();
        window.ethereum.on('accountsChanged', function (accounts) {
                accounts = web3.eth.getAccounts();
            });
        qrystalContract = new web3.eth.Contract(contract_abi, contract_address);
        }
        catch(error){
            alert(error);
        }
    }
    else{
        alert('Please use a Web3 compatible browser(such as Chrome, Brave) and a Web3 wallet(such as Metamask)');
    }
}

async function setMemory(memoryVal, tokenId){
    //Check if memory is valid
    console.log(memoryVal);
    if(memoryVal=='' || memoryVal== ' ' || memoryVal == null)
    {
        alert('Memory cannot be empty');
    }
    else
    {
    qrystalContract.methods.setMemory(tokenId, memoryVal).send({from: accounts[0]})
        .then(alert('You will be asked to pay some ether to update memory, gas settings and network congestion can cause delays in memory update. Once initiated, transaction will continue to process even when this window is closed'))
        .then(value => {alert('Successfully updated memory!! Scan again to access new memory..')})
        .catch(err => {alert('Memory update didn\'t go through')});
    }
}
//

window.onload = function() {
    //when the document is finished loading, replace everything
    //between the <a ...> </a> tags with the value of splitText
document.getElementById("qrystalTitle").innerHTML= 'QRYSTAL #'+ qrystalID;
document.getElementById("qrystalImage").src= 'https://qrystals.github.io/images/' + qrystalID + '.png'
} 