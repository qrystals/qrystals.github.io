//Get search query param
const urlParams = new URLSearchParams(window.location.search);
const qrystalID = urlParams.get('id')
//
//Web3 functions
const contract_address= "0xa071a7C9b053E6bCA911495fC5F0b56697F20CB8";
var contract_abi = ''
//Fetch ABI
fetch('./qrystals.json')
.then(res => res.text())
.then(data => {contract_abi = JSON.parse(data); initweb3();})

var accounts;
var qrystalContract;

async function initweb3() {
    if (window.ethereum != null) {
    web3 = new Web3(window.ethereum)
    try {
        // Request account access if needed
        await window.ethereum.enable()
        //Access account
        accounts = await web3.eth.getAccounts();
        qrystalContract = new web3.eth.Contract(contract_abi, contract_address);                 
    } catch (error) {
        alert('Something went wrong! Try later');
    }
    }
    else{
        alert('Please open this link using a Web3 compatible browser and a compatible wallet')
    }
}

async function setMemory(link, tokenId){
    qrystalContract.methods.setMemory(tokenId,link).send({from: accounts[0]})
        .then(alert('You will be asked to pay some ether to update memory, gas settings and network congestion can cause delays in memory update'))
        .then(value => {alert('Successfully updated memory!! Scan again to access new memory..')})
        .catch(err => {alert('Memory update didn\'t go through')});
}
//

window.onload = function() {
    //when the document is finished loading, replace everything
    //between the <a ...> </a> tags with the value of splitText
document.getElementById("qrystalTitle").innerHTML= 'QRYSTAL #'+ qrystalID;
document.getElementById("qrystalImage").src= 'https://qrystals.github.io/images/' + qrystalID + '.png'
} 