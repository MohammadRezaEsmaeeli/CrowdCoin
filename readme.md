# CrowdCoin

"ProjectFactory" is an ERC721 contract (NFT) with an Owner

"Project" is an ERC20 Contract(Fungable Token) with a spesfic number of shares(stokes) and shareholders

Please run "npm install" on the terminal to download the appropriate packages already defined to the package.json file.
Make sure you are in the source file.

**Please ensure you have downloaded the following additionally**

1. Ganache
2. Truffle (global installation)
3. Metamask.io (hooked up on the browser)

**To Do List**

1. make sure to refactor ALL Web3 code to the LATEST VERSION
2. must change "\_approve(from, msg.sender, amount);" to "approve(msg.sender , amount);"
3. change the optimizer's runs to a accepteble number
4. add error handeling to pages

**contract address** '0xEff073F0aFa13a896b7164ba38CF1B2620A7EEF9'
'0xc0666Bd4cf998cA7cB12b990A74f62cec757d490'
'0x085d4EB81D314Cd2F15A994548a91Ccb9CA1Cfeb'

**to migrate to renkiby in console go to ethereum folder and run :** "truffle migrate --network rinkeby"
**To run the development server on a local host scripts:** "npm run dev"

**Note on how To update the contract**
go to ethereum folder and do the instrauction

1. compile run: turffle migrate --network rinkeby
2. go to rinkeby console by runnig: truffle console --network rinkeby
3. create a new instance of ProjectFactory by runnig: let newFactory = await ProjectFactory.new()
4. get the address of the new contract by: newFactory.address
5. copy the address in the factory.js file
6. reset the server

**Note on the optimizer:**
(https://andresaaap.medium.com/how-to-deploy-a-smart-contract-on-a-public-test-network-rinkeby-using-infura-truffle-8e19253870c4)

**Note to deploy to main network:**

https://www.geeksforgeeks.org/deploying-smart-contract-on-test-main-network-using-truffle/
