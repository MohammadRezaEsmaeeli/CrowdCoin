const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new  Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/ProjectFactory.json');//------------create and compile ProjectFactory contract
const compiledProject = require('../ethereum/build/Project.json');//-------------------create and compile Project contract

let accounts;
let factory;
let projectAddress;
let project;

beforeEach(async ()=> {

    // accounts = await web3.eth.getAccounts();

    // factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    // .deploy({data: compiledFactory.bytecode, })
    // .send({from: accounts[0], gas: '1000000'});
    //-------------------------------
    // await factory.methods.creatProject('100').send({from: accounts[0], gas: '1000000'});
    
    // [projectAddress] = await factory.methods.getDeployedCampaigns().call();

    // project = await new web3.eth.Contract(
    //     JSON.parse(compiledProject.interface),
    //     projectAddress  
    // );
    //==================================

});


// describe('Campaigns', ()=> {
//     it('deploys a factory a campaign ', ()=>{
//         assert.ok(factory.options.address);
//         assert.ok(campaign.options.address);
//     });

//     it('marks caller as the manager', async ()=>{
//         const manager = await campaign.methods.manager().call();
//         assert.equal(accounts[0], manager);

//     });

//     it('allows pepole to contribute and marks them as approvers', async ()=>{
//         await campaign.methods.contirbute().send({
//             from: accounts[1],
//             value: '200'
//         });

//         const isContributer = await campaign.methods.approvers(accounts[1]).call();
//         assert(isContributer);
//     });

//     it('requires a minimum contribution ',async ()=>{
//         try{

//             await campaign.methods.contirbute().send({from: accounts[1], value: '10'});
//             assert(false);
//         }catch(err){
//             assert(err);

//         }
//     });

//     it('allows manger to make a payement request ', async ()=>{
//         await campaign.methods.creatRequest('Buy batterys','100', accounts[1]).send({from: accounts[0], gas: 1000000});
//         const request =  await campaign.methods.requests(0).call();
//         assert.equal('Buy batterys', request.description);

//     });

//     it('processes request', async ()=>{
//         await campaign.methods.contirbute().send({from: accounts[0], value: web3.utils.toWei('10', 'ether')});

//         await campaign.methods.creatRequest('A', web3.utils.toWei('5', 'ether'), accounts[1]).send({from: accounts[0], gas: '1000000'});
//         await campaign.methods.approveRequest(0).send({from:accounts[0], gas: '1000000'});
//         await campaign.methods.finalizeRequest(0).send({from: accounts[0], gas: '1000000'});


//         let balance = await web3.eth.getBalance(accounts[1]);
        
//         balance = web3.utils.fromWei(balance , 'ether');
//         balance = parseFloat(balance);

//         console.log(balance); 
//         assert(balance > 104);
    
//     });

// })