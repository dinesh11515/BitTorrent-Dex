import Image from "next/image";
import React from "react";
import me from "../../public/pic.jpg";

const INPUT: {
  id: string;
  type: string;
  label: string;
}[] = [
  {
    id: "name",
    type: "text",
    label: "Full Name",
  },
  {
    id: "email",
    type: "email",
    label: "Email",
  },
  {
    id: "btt",
    type: "checkbox",
    label: "BitTorrent Token",
  },
  {
    id: "price",
    type: "number",
    label: "Price",
  },
  {
    id: "amount",
    type: "number",
    label: "Amount",
  },
];

const RegistrationFrom: React.FC = () => {
  const registerHandler = (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Sumbitted");
  };

  const labelStyle: string = "font-semibold text-sm mb-1 text-gray-600";
  const inputStyle: string =
    "border border-gray-400 p-2 w-full rounded-lg mb-3";

  return (
    <div className="w-[80%] mx-auto flex rounded-xl bg-white h-full gap-10 p-3">
      <div className="flex-[0.33] bg-[#3c37ff] rounded-xl px-9 py-6 flex flex-col justify-between">
        <p className="text-white text-2xl font-semibold lowercase">Logo</p>
        <div>
          <h2 className="text-white text-4xl font-semibold mb-4">
            Start your journey with us.
          </h2>
          <p className="text-gray-300 text-base">
            Discover the world's best... some random paragraph we gonna write
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

        <form onSubmit={registerHandler}>
          <div className="flex flex-col">
            <label className={labelStyle} htmlFor="name">
              Full Name
            </label>
            <input
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
            <div className="relative  flex gap-4" id="payment">
              <label className="px-3 py-2 my-4 w-[10rem] flex items-center gap-1 rounded-lg border cursor-pointer border-gray-400">
                <input type="radio" className="mr-1" />
                AppName
              </label>
              <label className="px-3 py-2 my-4 w-[10rem] flex items-center gap-1 rounded-lg border cursor-pointer border-gray-400">
                <input type="radio" className="mr-1" />
                UPI
              </label>
              <label className="px-3 py-2 my-4 w-[10rem] flex items-center gap-1 rounded-lg border cursor-pointer border-gray-400">
                <input type="radio" className="mr-1" />
                Paypal
              </label>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <input className="" type="checkbox" id="btt" value="btt-token" />
            <label className={labelStyle}>BitTorrent Token</label>
          </div>

          <label htmlFor="token-address" className={labelStyle}>
            Token Address
          </label>
          <input className={inputStyle} type="text" id="token-address" />
          <div className="flex gap-10">
            <div className="flex flex-col ">
              <label htmlFor="price" className={labelStyle}>
                Price
              </label>
              <input
                className={`border border-gray-400 p-2 w-[18rem] rounded-lg`}
                id="price"
                type="number"
              />
            </div>
            <div>
              <label htmlFor="amount" className={labelStyle}>
                Amount
              </label>
              <input
                className={`border border-gray-400 p-2 w-[18rem] rounded-lg`}
                type="number"
                id="amount"
              />
            </div>
          </div>
          <button
            className="py-2 mt-4 w-[15rem] text-lg text-white bg-[#3c37ff] rounded-md hover:bg-[#2a269e]"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationFrom;
