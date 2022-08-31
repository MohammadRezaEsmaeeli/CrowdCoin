import web3 from './web3';
import ProjectFactory from './build/ProjectFactory.json';

//--------------------------deploy ProjectFactory and put the address here----------------------------------------------
const address = '0xEff073F0aFa13a896b7164ba38CF1B2620A7EEF9';
//----------------------------------------------------------------------------------------------------------------------
const instance = new web3.eth.Contract(ProjectFactory.abi, address);   

export default instance;