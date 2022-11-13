import Image from "next/image";
import React, { useRef, useState } from "react";
import me from "../../public/pic.jpg";
import paytm from "../../public/paytm.png";
import gpay from "../../public/gpay.png";
import phonepe from "../../public/phonepe.png";
import paypal from "../../public/paypal.png";
import { useContext } from "react";
import { dexContext } from "../../components/Layout";
import { ethers } from "ethers";
const RegistrationFrom: React.FC = () => {
  const { contract ,connect,connected} :any= useContext(dexContext);

  const [showPaytmUPI, setShowPaytmUPI] = useState<boolean>(false);
  const [showGpayUPI, setShowGpayUPI] = useState<boolean>(false);
  const [showPaypalUPI, setShowPaypalUPI] = useState<boolean>(false);
  const [showPhonepeUPI, setShowPhonepeUPI] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const tokenAddressInputRef = useRef<HTMLInputElement>(null);
  const tokenNameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const gpayInputRef = useRef<HTMLInputElement>(null);
  const phonepeInputRef = useRef<HTMLInputElement>(null);
  const paytmInputRef = useRef<HTMLInputElement>(null);
  const paypalInputRef = useRef<HTMLInputElement>(null);


  const paytmUPIHandler: () => void = () => {
    setShowPaytmUPI(!showPaytmUPI);
    setShowGpayUPI(false);
    setShowPaypalUPI(false);
    setShowPhonepeUPI(false);
  };

  const gpayUPIHandler: () => void = () => {
    setShowGpayUPI(!showGpayUPI);
    setShowPaytmUPI(false);
    setShowPaypalUPI(false);
    setShowPhonepeUPI(false);
  };

  const phonepeUPIHandler: () => void = () => {
    setShowPhonepeUPI(!showPhonepeUPI);
    setShowGpayUPI(false);
    setShowPaytmUPI(false);
    setShowPaypalUPI(false);
  };

  const paypalUPIHandler: () => void = () => {
    setShowPaypalUPI(!showPaypalUPI);
    setShowGpayUPI(false);
    setShowPaytmUPI(false);
    setShowPhonepeUPI(false);
  };

  const checkboxHandler = () => {
    setIsChecked(!isChecked);
  };

  const registerHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    let enteredName = nameInputRef.current!.value;
    let enteredEmail = emailInputRef.current!.value;
    let enteredPrice = priceInputRef.current!.value;
    let enteredAmount = amountInputRef.current!.value;
    let enteredGpayUPI = gpayInputRef.current?.value;
    let enteredPhonepeUPI = phonepeInputRef.current?.value;
    let enteredPaypalUPI = paypalInputRef.current?.value;
    let enteredPaytmUPI = paytmInputRef.current?.value;
    let enteredTokenAdd = tokenAddressInputRef.current?.value;
    let enteredTokenName = tokenNameInputRef.current?.value;

    if (
      enteredName.trim().length === 0 ||
      enteredEmail.trim().length === 0 ||
      enteredPrice.length === 0 ||
      enteredAmount.length === 0
    )
      return;

    if (
      enteredGpayUPI &&
      enteredPhonepeUPI &&
      enteredPaypalUPI &&
      enteredPaytmUPI
    )
      return alert("Please enter UPI address");

    if (!isChecked && enteredTokenAdd && enteredTokenName)
      return alert("Enter Token Address and Token Name or use BTT Token");
    const payments = []
    if (enteredGpayUPI) {
      payments.push({
        paymentMethod: "gpay",
        paymentAddress: enteredGpayUPI,
      })
    }
    if (enteredPhonepeUPI) {
      payments.push({
        userName: "phonepe",
        userId: enteredPhonepeUPI
      })
    }
    if (enteredPaypalUPI) {
      payments.push({
        userName: "paypal",
        userId: enteredPaypalUPI
      })
    }
    if (enteredPaytmUPI) {
      payments.push({
        userName: "paytm",
        userId: enteredPaytmUPI
      })
    }
    try {
      console.log("yess")
      const tx = await contract.register(enteredName, enteredEmail, payments);
      await tx.wait();
    
      if(isChecked){
        const price = ethers.utils.parseEther(enteredPrice);
        const amount = ethers.utils.parseEther(enteredAmount);
        const tx = await contract.sellBtt(amount, price,{value:amount});
        await tx.wait();
      }
      else{
        const price = ethers.utils.parseEther(enteredPrice);
        const amount = ethers.utils.parseEther(enteredAmount);
        const tx = await contract.sellToken(enteredTokenAdd, enteredTokenName, enteredAmount, enteredPrice);
        await tx.wait();
      }
      alert("Registered Successfully");
    }
    catch (error) {
      alert(error);
    }
    
  };

  const labelStyle: string = "font-semibold text-sm mb-1 text-gray-600";
  const inputStyle: string =
    "border border-gray-400 p-2 w-full rounded-lg mb-3";

  return (
    <div className="w-[80%] mx-auto flex rounded-xl bg-white h-screen gap-10 p-3">
      <div className="flex-[0.33] bg-[#3c37ff] rounded-xl px-9 py-6 flex flex-col justify-between">
        <p className="text-white text-2xl font-semibold lowercase">Logo</p>
        <div>
          <h2 className="text-white text-4xl font-semibold mb-4">
            Start your journey with us.
          </h2>
          <p className="text-gray-300 text-base">
            Discover the world best... some random paragraph we gonna write
            here about our application.
          </p>
        </div>

        <div className="bg-[#2520E3] py-3 px-4 rounded-lg">
          <p className="text-white text-sm mb-4">
            Simply unbelievable!! I am really satisfied with my projects and
            business.This is absolutely wonderful
          </p>
          <div className="flex gap-2">
            <Image
              src={me}
              height={45}
              width={45}
              className="rounded-xl"
              alt="me"
            />
            <div>
              <h2 className="text-white font-semibold text-sm ">Aman Mandal</h2>
              <p className="text-gray-300 text-xs">Developer</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[0.67] pr-10 py-4">
        <h2 className="text-3xl font-semibold mb-6">Register Here</h2>

        {/* Form */}
        <form onSubmit={registerHandler}>
          <div className="flex flex-col">
            <label className={labelStyle} htmlFor="name">
              Full Name
            </label>
            <input
              required
              ref={nameInputRef}
              className={inputStyle}
              type="text"
              id="name"
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <input
              required
              ref={emailInputRef}
              placeholder="john@email.com"
              className={inputStyle}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="payment" className={labelStyle}>
              Payment Methods
            </label>

            <div className="flex w-full gap-4 items-center mb-4">
              <div
                onClick={paytmUPIHandler}
                className="border border-gray-400 rounded-lg py-4 px-6 cursor-pointer hover:bg-gray-200"
              >
                <Image src={paytm} width={80} alt="paytm" />
              </div>

              <div
                onClick={phonepeUPIHandler}
                className="border border-gray-400 rounded-lg py-2 px-6 cursor-pointer hover:bg-gray-200"
              >
                <Image src={phonepe} width={50} height={50} alt="phonepe" />
              </div>

              <div
                onClick={gpayUPIHandler}
                className="border border-gray-400 rounded-lg py-2 px-6 cursor-pointer hover:bg-gray-200"
              >
                <Image src={gpay} width={50} height={50} alt="gpay" />
              </div>

              <div
                onClick={paypalUPIHandler}
                className="border border-gray-400 rounded-lg py-2 px-6 cursor-pointer hover:bg-gray-200"
              >
                <Image src={paypal} width={50} height={50} alt="paypal" />
              </div>
            </div>
            {showPaytmUPI && (
              <input
                ref={paytmInputRef}
                className={`border border-gray-400 p-2 w-[18rem] rounded-lg`}
                type="text"
                placeholder="abcd@paytm"
              />
            )}

            {showGpayUPI && (
              <input
                ref={gpayInputRef}
                className={`border border-gray-400 p-2 w-[18rem] rounded-lg`}
                type="text"
                placeholder="abcd@oksbi.com"
              />
            )}

            {showPaypalUPI && (
              <input
                ref={paypalInputRef}
                className={`border border-gray-400 p-2 w-[18rem] rounded-lg`}
                type="text"
                placeholder="abcd@paypal"
              />
            )}

            {showPhonepeUPI && (
              <input
                ref={phonepeInputRef}
                className={`border border-gray-400 p-2 w-[18rem] rounded-lg`}
                type="text"
                placeholder="abcd@phonepe"
              />
            )}
          </div>
          <div className="py-3">
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
            Register
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
