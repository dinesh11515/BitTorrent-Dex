import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Overall testing", function () {
    let contract : Contract;
    let owner : SignerWithAddress;
    let addr1 : SignerWithAddress;
    let addr2 : SignerWithAddress;

    before(async () => {
        const BttDex = await ethers.getContractFactory("BttDEX");
        contract = await BttDex.deploy();
        await contract.deployed();
        console.log('contract address: ', contract.address);
        [owner, addr1, addr2] = await ethers.getSigners();
    })

    it("registration", async function () {
        let name = "dinesh aitham";
        let email = "dineshaitham2@gmail.com";
        let payments = [{name:"paytm",userId:"8897230284@apaytm"},{name:"phonepe",userId:"8897230284@ybl"}];
        await contract.register(name,email,payments);
        let id = await contract.sellorId(owner.address);
        console.log('id: ', id);
        let user = await contract.paymentOfSellors(id);
        console.log('user: ', user);
    })

    it("sell", async function () {
        let amount = ethers.utils.parseEther("100");
        let price = ethers.utils.parseEther("10");
        let tx = await contract.sellBtt(amount,price);
        await tx.wait();
        tx = await contract.connect(addr1).buyBttRequest(owner.address,amount,price);
        await tx.wait();
        let initialBal = await addr1.provider?.getBalance(addr1.address)
        console.log('add1 before', {initialBal: ethers.utils.formatEther(initialBal?.toString() || '0').toString()})
        tx = await contract.releaseBtt();
    })
})
