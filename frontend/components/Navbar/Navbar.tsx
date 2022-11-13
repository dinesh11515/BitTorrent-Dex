import Link from "next/link";
import { useContext } from "react";
import { dexContext } from "../Layout/Layout";
const Navbar: React.FC = () => {
    const { connect }: any = useContext(dexContext);
    return (
      <nav className=" text-white bg-[#1e1e1e] py-4 ">
        <div className="flex justify-between w-[90%] mx-auto items-center">
          <h2 className="font-Grotesk font-semibold text-2xl">BitTorrent Dex</h2>
  
          <div className="flex gap-10 items-center">
            <ul className="flex gap-14 uppercase font-thin tracking-widest">
              <li className="hover:scale-105 hover:font-semibold cursor-pointer transition-all 0.1s ease-in-out">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:scale-105 hover:font-semibold cursor-pointer transition-all 0.1s ease-in-out">
                <Link href="/">Buy</Link>
              </li>
              <li className="hover:scale-105 hover:font-semibold cursor-pointer transition-all 0.1s ease-in-out">
                <Link href="/register">Sell</Link>
              </li>
              <li className="hover:scale-105 hover:font-semibold cursor-pointer transition-all 0.1s ease-in-out">
                <Link href="/">About</Link>
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