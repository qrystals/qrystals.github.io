const urlParams = new URLSearchParams(window.location.search);
const qrystalID = urlParams.get('id');
const contract_address= "0xa071a7C9b053E6bCA911495fC5F0b56697F20CB8";
var contract_abi = ''

if(qrystalID == null){
    //Redirect to homepage
}
else {
    //Web3 functions
    //Fetch ABI
    fetch('./qrystals.json')
    .then(res => res.text())
    .then(data => {contract_abi = JSON.parse(data); getMemory(qrystalID);})               
}

async function getMemory(tokenId) {
    if (window.ethereum != null) {
        web3 = new Web3(window.ethereum);
    }
    else {
        web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/d294fcd3bc584b77ae8f1ef4b19b1a5c"))
    }
    try {
    const qrystalContract = new web3.eth.Contract(contract_abi, contract_address); 
    qrystalContract.methods.getMemory(qrystalID).call()
    .then(value => {process_memory(value)})
    .catch(err => {console.log(err)});
    }
    catch (error) {
        alert('Something went wrong! Try later');
    }
}

function process_memory(memory){
    if(memory.startsWith('http')){
        //Redirect
        window.location.replace(memory);
    }
    else{
        alert(memory);
    }

}