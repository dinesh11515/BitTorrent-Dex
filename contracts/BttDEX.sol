//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./IBRC20.sol";
import "hardhat/console.sol";

contract  BttDEX {

    address constant BTT = address(0);
    uint256 id;

    struct payment {
        string name;
        string userId;
    }

    struct Sellor{
        uint256 id;
        address payable seller;
        string name;
        string email;
    }

    struct buyRequest{
        address payable buyer;
        address tokenAddress;
        uint256 amount;
    }

    struct SellorList {
        address payable seller;
        address tokenAddress;
        uint256 amount;
        uint256 locked;
        uint256 price;
        uint256 time;
    }

    mapping (uint256 => Sellor) public sellors;
    mapping (address => uint256) public sellorId;
    mapping (uint256 => payment[]) public paymentsById;
    mapping (address => mapping(address => SellorList)) public listings;
    mapping (address => buyRequest[]) public buyRequests;

    function register(string memory _name, string memory _email,payment[] memory _payments) public {
        require(sellorId[msg.sender] == 0, "Already registered");
        id++;
        sellors[id].id = id;
        sellors[id].seller = payable(msg.sender);
        sellors[id].name = _name;
        sellors[id].email = _email;
        sellorId[msg.sender] = id;
        
        for(uint256 i = 0; i < _payments.length; i++){
            console.log(_payments[i].name,_payments[i].userId);
            paymentsById[id].push(payment(_payments[i].name,_payments[i].userId));
            console.log(paymentsById[id][i].name,paymentsById[id][i].userId);
        }
    }

    function sellBtt(uint256 amount,uint256 price) public payable {
        require(msg.value == amount, "You must send the exact amount of BTT");
        if(listings[BTT][msg.sender].amount == 0){
            listings[BTT][msg.sender] = SellorList(payable(msg.sender), BTT, amount,0, price, block.timestamp);
        }
        else{
            listings[BTT][msg.sender].amount += amount;
            listings[BTT][msg.sender].price = price;
        }
    }

    function sellToken(address tokenAddress, uint256 amount,uint256 price) public {
        IBRC20 token = IBRC20(tokenAddress);
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        if(listings[tokenAddress][msg.sender].amount == 0){
            listings[tokenAddress][msg.sender] = SellorList(payable(msg.sender), tokenAddress, amount, 0,price, block.timestamp);
        }
        else{
            listings[tokenAddress][msg.sender].amount += amount;
            listings[tokenAddress][msg.sender].price = price;
        }
    }

    function buyBttRequest(address seller,uint256 amount) public payable {
        require(sellorId[seller] != 0, "Seller not found");
        SellorList memory listing = listings[BTT][seller];
        require(listing.amount >= amount, "Not enough BTT available");
        require(msg.value == listing.amount, "You must send the exact amount of BTT");
        buyRequests[seller].push(buyRequest(payable(msg.sender),BTT,amount));
        listing.amount -= amount;
        listing.locked += amount;
    }

    function buyTokenRequest(address payable seller,address tokenAddress,uint256 amount) public {
        require(sellorId[msg.sender] != 0, "Seller not found");
        SellorList memory listing = listings[tokenAddress][seller];
        require(listing.amount >= amount, "Not enough tokens available");
        buyRequests[seller].push(buyRequest(payable(msg.sender),tokenAddress,amount));
        listing.amount -= amount;
        listing.locked += amount;
    }

    function releaseBtt() public {
        uint256 id = sellorId[msg.sender];
        require(sellorId[msg.sender] != 0, "Seller not found");
        require(buyRequests[msg.sender][id].buyer != address(0), "Buy request not found");
        SellorList memory listing = listings[BTT][msg.sender];
        buyRequests[msg.sender][id].buyer.transfer(listing.amount);
        listings[BTT][msg.sender].locked -=  listing.amount;
    }
    
    function releaseToken() public {
        uint256 id = sellorId[msg.sender];
        require(sellorId[msg.sender] != 0, "Seller not found");
        require(buyRequests[msg.sender][id].buyer != address(0), "Buy request not found");
        IBRC20 token = IBRC20(buyRequests[msg.sender][id].tokenAddress);
        require(token.transfer(buyRequests[msg.sender][id].buyer, buyRequests[msg.sender][id].amount), "Token transfer failed");
        listings[buyRequests[msg.sender][id].tokenAddress][msg.sender].locked -=  buyRequests[msg.sender][id].amount;
    }

    function paymentOfSellors(uint id) public view returns(payment[] memory){
        return paymentsById[id];
    }

    
}