// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";



contract Project is ERC20 {

    struct SaleRequest{
        address seller;
        uint256 stockCount;
        bool completed;
        // string createDate;
        address buyer;
        bool canceled;
    }

    struct Detail {
        string owner;
        string description;
        uint initalPricePerStock;
    }

    string projectName;
    address public manager;
    uint private projectID;
    Detail public detail;
    uint public pricePerStock;
    uint public stockCount;
    SaleRequest [] public  saleRequests ;


    mapping(address => bool ) public  sharholders;
    uint private sharholdersCount;

    constructor (address owner, uint pID, string memory pName, uint stockCounts, uint initalPricePerStocks, string memory onwerName, string memory descriptions, string memory _symbol) ERC20(pName, _symbol){
        sharholders[owner]= true;
        sharholdersCount = 1;
        manager = owner;
        projectID = pID;
        projectName = pName;
        pricePerStock = initalPricePerStocks;
        stockCount = stockCounts;
        Detail memory temp = Detail({
            owner:onwerName,
            description:descriptions,
            initalPricePerStock: initalPricePerStocks
        });
        detail = temp;


        _mint(owner, stockCount);

    }

    function createSaleRequest(uint256 _stockCount) public  {
        require(sharholders[msg.sender]  , "Only ShareHolders can create sale request");
        require(balanceOf(msg.sender )>= _stockCount, "you dont have this much stock to sale");
        SaleRequest memory temp =  SaleRequest({
            seller: msg.sender,
            stockCount: _stockCount,
            completed: false,
            canceled: false,
            // CreateDate: 
            buyer: address(0)

        });
        saleRequests.push(temp);
    }

    // modifier restrictedToShareholders (){
    //     require(sharholders[msg.sender] != 0 , "Only ShareHolders can create sale request");
    // _;
    // }
    //  for sending .001 share if needed 
    // function decimals() public view virtual override returns (uint8) {
    //     return 3;
    // }



    function buy (address from, uint256 amount, uint256 requestIndex) public payable {
        require(amount <= saleRequests[requestIndex].stockCount, "Requested amount exceeds the amount for sale");
        require(msg.value >= amount*pricePerStock, "Amount of money is less than the actual price." );
        _approve(from, msg.sender, amount); // must change to approve(msg.sender , amount);
        transferFrom(from, msg.sender, amount);
        saleRequests[requestIndex].stockCount -= amount;


        if(saleRequests[requestIndex].stockCount ==0 ){
            saleRequests[requestIndex].completed = true;
        }
    }


    function getSaleRequestsCount() public view returns(uint){
        return saleRequests.length;
    }

    function cancelSaleRequest(uint256 requestIndex) public {
        require(saleRequests[requestIndex].completed == false, "this Request is already completed");

        saleRequests[requestIndex].canceled = true;
    }

    function activeSaleRequest(uint256 requestIndex) public {
        saleRequests[requestIndex].canceled = false;
    }

    function getSummery() public view returns (string memory, uint, uint, uint, address, string memory, string memory, uint, string memory, string memory){

        return(
            projectName,
            pricePerStock,
            stockCount,
            sharholdersCount,
            manager,
            detail.description,
            detail.owner,
            detail.initalPricePerStock,
            name(),
            symbol()

        );

    }



}