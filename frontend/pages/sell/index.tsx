import Image from "next/image";
import React, { useRef, useState } from "react";
import me from "../../public/pic.jpg";
import paytm from "../../public/paytm.png";
import gpay from "../../public/gpay.png";
import phonepe from "../../public/phonepe.png";
import paypal from "../../public/paypal.png";
import { useContext } from "react";
import { dexContext } from "../../components/Layout";
import { ethers, Signer } from "ethers";
import {erc20abi,contract_address} from "../../constants/index"
const RegistrationFrom: React.FC = () => {
  const { contract ,connect,connected,signer} :any= useContext(dexContext);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  
  const tokenAddressInputRef = useRef<HTMLInputElement>(null);
  const tokenNameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  


  
  const checkboxHandler = () => {
    setIsChecked(!isChecked);
  };

  const registerHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    
    let enteredPrice = priceInputRef.current!.value;
    let enteredAmount = amountInputRef.current!.value;
    let enteredTokenAdd = tokenAddressInputRef.current?.value;
    let enteredTokenName = tokenNameInputRef.current?.value;

    if (
      enteredPrice.length === 0 ||
      enteredAmount.length === 0
    )
      return;

    if (!isChecked && enteredTokenAdd && enteredTokenName)
      return alert("Enter Token Address and Token Name or use BTT Token");

    try {
      if(isChecked){
        const price = ethers.utils.parseEther(enteredPrice);
        const amount = ethers.utils.parseEther(enteredAmount);
        const tx = await contract.sellBtt(amount, price,{value:amount});
        await tx.wait();
      }
      else{
        const price = ethers.utils.parseEther(enteredPrice);
        const amount = ethers.utils.parseEther(enteredAmount);
        const tokenContract = new ethers.Contract(enteredTokenAdd as string, erc20abi, signer);
        let tx = await tokenContract.approve(contract_address,amount);
        await tx.wait();
        tx = await contract.sellToken(enteredTokenAdd, enteredTokenName, amount, price);
        await tx.wait();
      }
      alert("Registered Successfully");
    }
    catch (error) {
      alert(error);
    }
    
  };

  const labelStyle: string = "font-semibold text-sm mb-1 text-gray-600 w-full flex items-center";
  const inputStyle: string =
    "border border-gray-400 p-2 w-full rounded-lg mb-3";

  return (
    <div className="w-full  flex flex-col  items-center  justify-center rounded-xl  gap-10 mt-10">
      
      <div className="flex-[0.67] bg-white p-8 rounded-xl">
        <p className="text-3xl font-semibold mb-6">Sell any BitTorrent Chain Token</p>

        {/* Form */}
        <form onSubmit={registerHandler}>
            <p className="mb-1">Select this if you are selling BitTorrent token</p>
          <div className="py-3 ">
            <label className={`${labelStyle}`}>
              <input
                onChange={checkboxHandler}
                className="inline-block h-4 w-4 mr-2 rounded-lg"
                type="checkbox"
                id="btt"
                value="btt"
                checked={isChecked}
              />
              BitTorrent Token
            </label>
          </div>

          <label htmlFor="token-address" className={labelStyle}>
            Token Address
          </label>
          <input
            ref={tokenAddressInputRef}
            className={inputStyle}
            type="text"
            id="token-address"
          />
          <label htmlFor="token-name" className={labelStyle}>
            Token Name
          </label>
          <input
            ref={tokenNameInputRef}
            className={inputStyle}
            type="text"
            id="token-name"
          />
          <div className="flex gap-10">
            <div className="flex flex-col ">
              <label htmlFor="price" className={labelStyle}>
                Price
              </label>
              <input
                required
                ref={priceInputRef}
                className={`border border-gray-400 p-2 w-[18rem] rounded-lg`}
                id="price"
                type="text"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="amount" className={labelStyle}>
                Amount
              </label>
              <input
                required
                ref={amountInputRef}
                className={`border border-gray-400 p-2 w-[18rem] rounded-lg`}
                type="number"
                id="amount"
              />
            </div>
          </div>
          {
            connected ? 
          <button
            className="py-2 mt-4 w-[15rem] text-lg text-white bg-[#3c37ff] rounded-md hover:bg-[#2a269e]"
            type="submit"
          >
            Sell
          </button>
          :
          <button
            className="py-2 mt-4 w-[15rem] text-lg text-white bg-[#3c37ff] rounded-md hover:bg-[#2a269e]"
            type="button"
            onClick={connect}
          >
            Connect Wallet
          </button>

          }
        </form>
      </div>
    </div>
  );
};

export default RegistrationFrom;
