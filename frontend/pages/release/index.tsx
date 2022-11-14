import React from "react";
import ReleaseItem from "../../components/ReleaseItem/ReleaseItem";
import { useContext,useState,useEffect } from "react";
import { dexContext } from "../../components/Layout/Layout";
import { ethers } from "ethers";
import { contract_address, contract_abi } from "../../constants/index";
const DUMMY_DATA = [
  { buyerName: "Aman", tokenName: "BTT", amount: 2000, price: 0.0000068 },
  { buyerName: "Aman", tokenName: "BTT", amount: 1200, price: 0.0000068 }
];

interface Data {
  buyerName: string;
  tokenName: string;
  amount: number;
  price: number;
}

const ReleasePage = () => {
  const { contract,signer ,account}: any = useContext(dexContext);
  const [data, setData] = useState<Data[]>([]);


  const getData = async () => {
    try{
      const data = await contract.getRequests(account);
      console.log(data[0]);
      setData(data);
    }
    catch(e){
      alert(e);
    }
  }

  useEffect(() => {
    // getData();
  }, []);
  return (
    <section className="h-screen bg-[#1e1e1e] bg-[url('/bg2.png')] bg-center overflow-hidden">
      <div className="w-[90%] mx-auto py-28">
        <h2 className="font-Grotesk text-3xl font-semibold mb-8 text-center bg-gradient-to-r text-transparent bg-clip-text from-[#FD42FB] via-[#CD9ECD] to-[#753FF3]">
          Release your crypto here!
        </h2>
        <div className="w-[80%] h-full mx-auto border border-gray-400 rounded-xl p-2 ">
          <div className="flex justify-around py-5 font-Grotesk text-lg text-gray-400 bg-blur bg-[#313131]/10 uppercase tracking-wider">
            
            <h2>Token</h2>
            <h2>Quantity</h2>
            <p>Price</p>
            <p>Release</p>
          </div>

          <div className="">
            {DUMMY_DATA.map((item, index) => (
              <ReleaseItem
                key={index}
                sellerName={item.buyerName}
                tokenName={item.tokenName}
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

export default ReleasePage;
