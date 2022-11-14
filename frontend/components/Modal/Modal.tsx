import Image from "next/image";
import React, { useRef, useState } from "react";
import { ethers } from "ethers";
const Backdrop: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0  h-screen w-screen bg-black/80"
    ></div>
  );
};

const Modal: React.FC<{
  onClose: () => void;
  tokenName: string;
  tokenPrice: string;
  tokenQuantity: string;
  buyItem: (id: number, amount: number, name: string) => void;
}> = ({ tokenName, tokenPrice, tokenQuantity, onClose ,buyItem}) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const quantitynputRef = useRef<HTMLInputElement>(null);

  const modalSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    let enteredName = nameInputRef.current!.value;
    let enteredQuantity = quantitynputRef.current!.value;

    if (!enteredName || !enteredQuantity)
      return alert("Please enter input fields");

    buyItem(1,Number(enteredQuantity),enteredName);
  };

  return (
    <>
      <Backdrop onClose={onClose} />
      <section className="rounded-2xl bg-gray-200/30 backdrop-blur-xl p-8 w-[30rem] fixed left-[50%] top-[55%] -translate-x-[50%] -translate-y-[50%]  mx-auto">
        <div className="bg-[#1e1e1e] rounded-lg py-3 px-5">
          <h2 className="text-gray-400 font-semibold mb-2">
            Token Name:{" "}
            <span className="text-lg text-white ml-2">{tokenName}</span>{" "}
          </h2>
          <h2 className="text-gray-400 font-semibold mb-2">
            Token Price:{" "}
            <span className="text-lg text-white ml-2">{tokenPrice}</span>{" "}
          </h2>
          <h2 className="text-gray-400 font-semibold ">
            Available Tokens:{" "}
            <span className="text-lg text-white ml-2">{tokenQuantity}</span>
          </h2>
        </div>

        <form>
          <div className="flex flex-col mt-6">
            <label className="font-sm text-white font-Grotesk">Name</label>
            <input
              required
              ref={nameInputRef}
              className="p-3 rounded-lg"
              type="text"
              placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col my-3">
            <label className="font-sm text-white font-Grotesk">
              Token Quantity
            </label>
            <input
              required
              ref={quantitynputRef}
              className="p-3 rounded-lg"
              type="number"
              placeholder="12"
            />
          </div>

          <div className="flex flex-wrap justify-between items-center mt-5">
            <div className="cursor-pointer border border-gray-300 py-1 px-6 bg-gray-200 rounded-lg hover:bg-white">
              <Image src="/gpay.png" width={40} height={40} alt="gpay" />
            </div>
            <div className="cursor-pointer border border-gray-300 py-1 px-6 bg-gray-200 rounded-lg hover:bg-white">
              <Image src="/phonepe.png" width={40} height={40} alt="phonepe" />
            </div>
            <div className="cursor-pointer border border-gray-300 py-3 px-3 bg-gray-200 rounded-lg hover:bg-white">
              <Image src="/paytm.png" width={60} height={10} alt="paytm" />
            </div>
            <div className="cursor-pointer border border-gray-300 px-6 py-1 bg-gray-200 rounded-lg hover:bg-white">
              <Image src="/paypal.png" width={40} height={40} alt="paypal" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1e1e1e] text-gray-300 uppercase font-Grotesk tracking-wider py-3 mt-5 rounded-xl"
            onClick={modalSubmitHandler}
          >
            Confirm
          </button>
        </form>
      </section>
    </>
  );
};

export default Modal;
