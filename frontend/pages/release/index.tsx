import React from "react";
import ReleaseItem from "../../components/ReleaseItem/ReleaseItem";

const DUMMY_DATA = [
  { sellerName: "Aman", tokenName: "USDT", quantity: 2, price: 134 },
  { sellerName: "Aman", tokenName: "BTT", quantity: 12, price: 674 },
  { sellerName: "Aman", tokenName: "ETH", quantity: 76, price: 1934 },
  { sellerName: "Aman", tokenName: "BTC", quantity: 20, price: 214 },
  { sellerName: "Aman", tokenName: "USDT", quantity: 2, price: 136 },
];

const ReleasePage = () => {
  return (
    <section className="h-screen bg-[#1e1e1e] bg-[url('/bg2.png')] bg-center overflow-hidden">
      <div className="w-[90%] mx-auto py-28">
        <h2 className="font-Grotesk text-3xl font-semibold mb-8 text-center bg-gradient-to-r text-transparent bg-clip-text from-[#FD42FB] via-[#CD9ECD] to-[#753FF3]">
          Release your crypto here!
        </h2>
        <div className="w-[80%] h-full mx-auto border border-gray-400 rounded-xl p-2 ">
          <div className="flex justify-around py-5 font-Grotesk text-lg text-gray-400 bg-blur bg-[#313131]/10 uppercase tracking-wider">
            <h2>Seller</h2>
            <h2>Token</h2>
            <h2>Quantity</h2>
            <p>Price</p>
            <p>Release</p>
          </div>

          <div className="">
            {DUMMY_DATA.map((item, index) => (
              <ReleaseItem
                key={index}
                sellerName={item.sellerName}
                tokenName={item.tokenName}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReleasePage;
