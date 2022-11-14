import Image from "next/image";
import React, { useRef, useState } from "react";
import me from "../../public/pic.jpg";
import paytm from "../../public/paytm.png";
import gpay from "../../public/gpay.png";
import phonepe from "../../public/phonepe.png";
import paypal from "../../public/paypal.png";
import { useContext } from "react";
import { dexContext } from "../../components/Layout/Layout";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationFrom: React.FC = () => {
  const { contract, connect, connected, signer }: any = useContext(dexContext);

  const [paytmUPI, setPaytmUPI] = useState<string>("");
  const [gpayUPI, setGpayUPI] = useState<string>("");
  const [phonepeUPI, setPhonepeUPI] = useState<string>("");
  const [paypalEmail, setPaypalEmail] = useState<string>("");

  const [showPaytmUPI, setShowPaytmUPI] = useState<boolean>(false);
  const [showGpayUPI, setShowGpayUPI] = useState<boolean>(false);
  const [showPaypalUPI, setShowPaypalUPI] = useState<boolean>(false);
  const [showPhonepeUPI, setShowPhonepeUPI] = useState<boolean>(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
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

  const paytmUPIChangeHandler = () => {
    setPaytmUPI(paytmInputRef.current!.value);
  };

  const gpayUPIChangeHandler = () => {
    setGpayUPI(gpayInputRef.current!.value);
  };

  const phonepeUPIChangeHandler = () => {
    setPhonepeUPI(phonepeInputRef.current!.value);
  };

  const paypalEmailChangeHandler = () => {
    setPaypalEmail(paypalInputRef.current!.value);
  };

  const registerHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    let enteredName = nameInputRef.current!.value;
    let enteredEmail = emailInputRef.current!.value;
    let enteredGpayUPI = gpayInputRef.current?.value;
    let enteredPhonepeUPI = phonepeInputRef.current?.value;
    let enteredPaypalUPI = paypalInputRef.current?.value;
    let enteredPaytmUPI = paytmInputRef.current?.value;

    if (enteredName.trim().length === 0 || enteredEmail.trim().length === 0)
      return;

    if (
      enteredGpayUPI &&
      enteredPhonepeUPI &&
      enteredPaypalUPI &&
      enteredPaytmUPI
    )
      return alert("Please enter UPI address");

    const payments = [];
    if (enteredGpayUPI) {
      payments.push({
        appName: "gpay",
        userId: gpayUPI,
      });
    }
    if (enteredPhonepeUPI) {
      payments.push({
        appName: "phonepe",
        userId: phonepeUPI,
      });
    }
    if (enteredPaypalUPI) {
      payments.push({
        appName: "paypal",
        userId: paypalEmail,
      });
    }
    if (enteredPaytmUPI) {
      payments.push({
        appName: "paytm",
        userId: paytmUPI,
      });
    }
    try {
      const tx = await contract.register(enteredName, enteredEmail, payments);
      await tx.wait();
      toast.success("Registered Successfully");
    } catch (error) {
      alert(error);
    }
  };

  const labelStyle: string = "font-semibold text-sm mb-1 text-gray-600";
  const inputStyle: string =
    "border border-gray-400 p-2 w-full rounded-lg mb-3";

  return (
    <div className="h-screen py-20 bg-[#1E1e1e] bg-[url('/bg2.png')] bg-center">
      <div className="w-[80%] mx-auto flex rounded-xl  gap-10 px-3 py-5 ">
        <div className="flex-[0.33] bg-[#3c37ff] rounded-xl px-9 py-6 flex flex-col justify-between">
          <div>
            <h2 className="text-white text-3xl font-semibold mb-4">
              Start your crypto journey with us.
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
                <h2 className="text-white font-semibold text-sm ">
                  Aman Mandal
                </h2>
                <p className="text-gray-300 text-xs">Developer</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[0.67] pr-10 py-4">
          <h2 className="text-3xl text-white font-semibold mb-6">Register Here</h2>

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
                  value={paytmUPI}
                  onChange={paytmUPIChangeHandler}
                />
              )}

              {showGpayUPI && (
                <input
                  ref={gpayInputRef}
                  className={`border border-gray-400 p-2 w-[18rem] rounded-lg`}
                  type="text"
                  placeholder="abcd@oksbi.com"
                  value={gpayUPI}
                  onChange={gpayUPIChangeHandler}
                />
              )}

              {showPaypalUPI && (
                <input
                  ref={paypalInputRef}
                  className={`border border-gray-400 p-2 w-[18rem] rounded-lg`}
                  type="text"
                  placeholder="abcd@gmail.com"
                  value={paypalEmail}
                  onChange={paypalEmailChangeHandler}
                />
              )}

              {showPhonepeUPI && (
                <input
                  ref={phonepeInputRef}
                  className={`border border-gray-400 p-2 w-[18rem] rounded-lg`}
                  type="text"
                  placeholder="abcd@ybl"
                  value={phonepeUPI}
                  onChange={phonepeUPIChangeHandler}
                />
              )}
            </div>

            {connected ? (
              <button
                className="py-2 mt-4 w-[15rem] text-lg text-white bg-[#3c37ff] rounded-md hover:bg-[#2a269e]"
                type="submit"
              >
                Register
              </button>
            ) : (
              <button
                className="py-2 mt-4 w-[15rem] text-lg text-white bg-[#3c37ff] rounded-md hover:bg-[#2a269e]"
                type="button"
                onClick={connect}
              >
                Connect Wallet
              </button>
            )}
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegistrationFrom;
