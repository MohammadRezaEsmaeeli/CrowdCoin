// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";//  burnable has inhereted the ERC721Enumerable witch inhereted ERC721

import "./Project.sol";

contract ProjectFactory is ERC721Burnable {

    address [] public deployedProjects;
    uint private _projectIDs = 0;
    

    constructor() ERC721("MostafaAndMohammadReza", "MAM") { }

    function creatProject(string memory projectName, uint stockCounts, uint initalPricePerStocks, string memory onwerName, string memory descriptions) public {
        address newProject = address(new Project(msg.sender, _projectIDs, projectName, stockCounts, initalPricePerStocks, onwerName, descriptions, symbol()));
       

        deployedProjects.push(newProject);
        _mint(msg.sender, _projectIDs);
         _projectIDs++;

    }

    function getDeployedProjects()public view returns(address [] memory) {
        return deployedProjects;
    }
}