import React, { useEffect } from "react";
import BuyingItem from "../../components/BuyingItem/BuyingItem";
import { useContext,useState } from "react";
import { dexContext } from "../../components/Layout/Layout";
import { ethers } from "ethers";
import { contract_address, contract_abi } from "../../constants/index";
const DUMMY_DATA = [
  { name: "USDT", quantity: 2, price: 134 },
  { name: "BTT", quantity: 12, price: 674 },
  { name: "ETH", quantity: 76, price: 1934 },
  { name: "BTC", quantity: 20, price: 214 },
  { name: "USDT", quantity: 2, price: 136 },
];

interface Data {
  tokenName: string;
  tokenAddress: string;
  amount: number;
  price: number;
}

const BuyingPage: React.FC = () => {
  
  const [data, setData] = useState<Data[]>([]);

  const getData = async () => {
    try{
      const provider = new ethers.providers.JsonRpcProvider("https://pre-rpc.bt.io/");
      const contract = new ethers.Contract(
        contract_address,
        contract_abi,
        provider
      );
      const data = await contract.allListings();
      setData(data);
    }
    catch(e){
      alert(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <section className="h-screen bg-[#1e1e1e] bg-[url('/bg2.png')] bg-center overflow-hidden">
      <div className="w-[90%] mx-auto py-10">
        <h2 className="font-Grotesk text-3xl font-semibold mb-8 text-center bg-gradient-to-r text-transparent bg-clip-text from-[#FD42FB] via-[#CD9ECD] to-[#753FF3]">
          Get Your Required Crypto with a Single Click.
        </h2>
        <div className="w-[80%] h-full mx-auto border border-gray-400 rounded-xl p-2 ">
          <div className="flex gap-40 justify-center py-5 font-Grotesk text-lg text-gray-400 bg-blur bg-[#313131]/10 uppercase tracking-wider">
            <h2 className="-ml-8">Name</h2>
            <h2>Quantity</h2>
            <p>Price</p>
            <p>Buy</p>
          </div>

          <div className="">
            {data && data.map((item, index) => (
              <BuyingItem
                key={index}
                name={item.tokenName}
                price={item.price}
                quantity={item.amount}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyingPage;
