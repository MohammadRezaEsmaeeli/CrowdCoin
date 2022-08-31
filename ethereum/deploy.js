const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require ('web3');
const compiledFactory = require('./build/ProjectFactory.json'); //--------create and compile Project Factory 

const provider = new HDWalletProvider (
    'injury tonight green title popular tooth private pet slight pig gravity orbit',
    'https://rinkeby.infura.io/v3/c2c641975289477ea8bcdb2028ae454d'
    );

const web3 = new Web3(provider);

const deploy = async ()=>{

  const accounts = await web3.eth.getAccounts();    //-------------------------refactore on web3 needed
  console.log('Attemting to deploy from account  ', accounts[0]);



  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({data : compiledFactory.bytecode })
  .send({gas:'1000000', from : accounts[0]});

  
  console.log('Contract  deploye to ', result.options.address);


  provider.engine.stop();
  return result.options.address;

};

const deployedAddress = deploy();

//export default deployedAddress;

