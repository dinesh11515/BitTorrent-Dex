//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./IBRC20.sol";
import "hardhat/console.sol";

contract  BttDEX {

    uint256 orderId;
    uint256 listId;

    struct payment {
        string userName;
        string userId;
    }

    struct Seller{
        address payable seller;
        string name;
        string email;
    }

    struct buyRequest{
        address payable buyer;
        address payable seller;
        address tokenAddress;
        bool matic;
        bool fulfilled;
        bool paid;
        bool cancelled;
        bool report;
        uint256 amount;
        uint256 price;
        uint256 orderId;
    }

    struct SellerList {
        address payable seller;
        address tokenAddress;
        string tokenName;
        bool matic;
        uint256 listId;
        uint256 amount;
        uint256 locked;
        uint256 price;
        uint256 time;
    }

    mapping (address => Seller) public sellers;
    mapping (address => mapping (address => SellerList)) public tokenSellerList;
    mapping (address => SellerList) public sellerList;
    mapping (address => payment[]) public paymentsOfSeller;
    mapping (address => buyRequest[]) public buyRequests;
    mapping (uint256 => buyRequest) public orders;
    mapping (address => buyRequest[]) public userRequests;
    
    SellerList[] public listings;


    function register(string memory _name, string memory _email,payment[] memory _payments) public {
        require (sellers[msg.sender].seller == address(0), "You are already registered");
        sellers[msg.sender] = Seller(payable(msg.sender),_name,_email);
        console.log(_payments[0].userName);
        for(uint8 i = 0; i < _payments.length; i++){
            paymentsOfSeller[msg.sender].push(_payments[i]);
        }
    }

    function sellBtt(uint256 amount,uint256 price) public payable {
        require(msg.value == amount, "You must send the exact amount");
        if(sellerList[msg.sender].seller != msg.sender){
            sellerList[msg.sender] = SellerList(payable(msg.sender), address(0),"MATIC",true,listId, amount,0, price, block.timestamp);
            listings.push(sellerList[msg.sender]);
            listId++;
        }
        else{
            sellerList[msg.sender].amount += amount;
            sellerList[msg.sender].price = price;
            sellerList[msg.sender].time = block.timestamp;
            listings[sellerList[msg.sender].listId] = sellerList[msg.sender];
        }
    }

    function sellToken(address tokenAddress,string memory tokenName, uint256 amount,uint256 price) public {
        IBRC20 token = IBRC20(tokenAddress);
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        if(tokenSellerList[msg.sender][tokenAddress].seller != msg.sender){
            tokenSellerList[msg.sender][tokenAddress] = SellerList(payable(msg.sender), tokenAddress,tokenName,false,listId, amount,0, price, block.timestamp);
            listings.push(tokenSellerList[msg.sender][tokenAddress]);
            listId++;
        }
        else{
            tokenSellerList[msg.sender][tokenAddress].amount += amount;
            tokenSellerList[msg.sender][tokenAddress].price = price;
            tokenSellerList[msg.sender][tokenAddress].time = block.timestamp;
            listings[tokenSellerList[msg.sender][tokenAddress].listId] = tokenSellerList[msg.sender][tokenAddress];
        }
    }

    function buyBttRequest(uint256 id,uint256 amount) public payable {
        require(listings[id].amount >= amount, "Not enough tokens");
        address payable seller = listings[id].seller;
        require(seller != address(0), "Seller not found");
        buyRequests[seller].push(buyRequest(payable(msg.sender),seller,address(0),true,false,true,false,false,amount,listings[id].price,orderId));
        orders[orderId] = buyRequests[seller][buyRequests[seller].length-1];
        userRequests[msg.sender].push(buyRequests[listings[id].seller][buyRequests[listings[id].seller].length - 1]);
        sellerList[listings[id].seller].amount -= amount;
        sellerList[listings[id].seller].locked += amount;
        listings[id] = sellerList[listings[id].seller];
        orderId++;
    }

    function buyTokenRequest(uint256 id,uint256 amount) public {
        require(listings[id].amount >= amount, "Not enough tokens");
        SellerList memory listing = tokenSellerList[listings[id].seller][listings[id].tokenAddress];
        require(listing.seller != address(0), "Seller not found");
        buyRequests[listing.seller].push(buyRequest(payable(msg.sender),listings[id].seller,listings[id].tokenAddress,false,false,true,false,false,amount,listing.price,orderId));
        orders[orderId] = buyRequests[listing.seller][buyRequests[listing.seller].length - 1];
        userRequests[msg.sender].push(buyRequests[listing.seller][buyRequests[listing.seller].length - 1]);
        tokenSellerList[listings[id].seller][listings[id].tokenAddress].amount -= amount;
        tokenSellerList[listings[id].seller][listings[id].tokenAddress].locked += amount;
        listings[id] = tokenSellerList[listings[id].seller][listings[id].tokenAddress];
        orderId++;
    }

    function release(uint256 id) public {
        require(orders[id].seller == msg.sender, "You are not the seller");
        require(orders[id].fulfilled == false, "Order fulfilled");
        if(orders[id].matic == true){
            orders[id].buyer.transfer(orders[id].amount);
            sellerList[orders[id].seller].locked -= orders[id].amount;
            listings[sellerList[orders[id].seller].listId] = sellerList[orders[id].seller];
        }
        else{
            IBRC20 token = IBRC20(orders[id].tokenAddress);
            require(token.transfer(orders[id].buyer, orders[id].amount), "Token transfer failed");
            tokenSellerList[orders[id].seller][orders[id].tokenAddress].locked -= orders[id].amount;
            listings[tokenSellerList[orders[id].seller][orders[id].tokenAddress].listId] = tokenSellerList[orders[id].seller][orders[id].tokenAddress];
        }
        orders[id].fulfilled = true;
    }
    
    function sellerPayments(address seller) public view returns (payment[] memory){
        return paymentsOfSeller[seller];
    }
}