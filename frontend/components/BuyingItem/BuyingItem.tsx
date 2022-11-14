import React, { useState } from "react";
import { ethers } from "ethers";
import Modal from "../Modal/Modal";
const BuyingItem: React.FC<{
  name: string;
  quantity: number;
  price: number;
}> = ({ name, quantity, price }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const buyItemHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  function getFormatedAmount(amount: number) {
    return ethers.utils.formatEther(amount).toString();
  }

  return (
    <div className="flex items-center text-gray-400 py-3  rounded mt-2 bg-blur bg-[#474747]/30">
      <h2 className=" flex-[0.25] text-center font-semibold text-white">
        {name}
      </h2>
      <p className="flex-[0.25] text-center">{getFormatedAmount(quantity)}</p>
      <p className="flex-[0.25] text-center text-white font-Grotesk">
        <span className="text-green-400 font-semibold">$</span>{" "}
        {getFormatedAmount(price)}
      </p>
      <button
        className="py-2 flex-[0.2] w-[8rem] rounded-lg text-white text-lg font-semibold bg-gray-700 hover:bg-gray-500"
        onClick={buyItemHandler}
      >
        Buy
      </button>

      {showModal && (
        <Modal
          onClose={closeModalHandler}
          tokenName={name}
          tokenPrice={getFormatedAmount(price)}
          tokenQuantity={getFormatedAmount(quantity)}
        />
      )}
    </div>
  );
};

export default BuyingItem;
