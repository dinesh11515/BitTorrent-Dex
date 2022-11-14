import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useContext } from "react";
import { dexContext } from "../Layout/Layout";
const Navbar: React.FC = () => {
  const { connect }: any = useContext(dexContext);
  const router: NextRouter = useRouter();

  const homepageHandler: () => void = () => {
    router.push("/");
  };

  return (
    <nav className=" text-white bg-[#1e1e1e] py-4 ">
      <div className="flex justify-between w-[90%] mx-auto items-center">
        <h2
          onClick={homepageHandler}
          className="font-Grotesk font-semibold text-2xl cursor-pointer"
        >
          BitTorrent Dex
        </h2>

        <div className="flex gap-10 items-center">
          <ul className="flex gap-14 uppercase font-thin tracking-widest">
            <li className="hover:scale-105 hover:font-semibold cursor-pointer transition-all 0.1s ease-in-out">
              <Link href="/register">Register</Link>
            </li>
            <li className="hover:scale-105 hover:font-semibold cursor-pointer transition-all 0.1s ease-in-out">
              <Link href="/buy">Buy</Link>
            </li>
            <li className="hover:scale-105 hover:font-semibold cursor-pointer transition-all 0.1s ease-in-out">
              <Link href="/sell">Sell</Link>
            </li>
            <li className="hover:scale-105 hover:font-semibold cursor-pointer transition-all 0.1s ease-in-out">
              <Link href="/">About Us</Link>
            </li>
          </ul>
        </div>

        <button
          onClick={connect}
          className="bg-gray-600 text-white text-lg px-4 py-2 rounded-md font-Grotesk font-medium hover:scale-105 hover:bg-gray-300 hover:text-black"
        >
          Connect Wallet
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
