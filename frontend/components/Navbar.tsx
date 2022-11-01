import Link from "next/link";
import { useContext } from "react";
import { dexContext } from "../components/Layout";
export default function Navbar() {
    const {connect} :any= useContext(dexContext);
    return (
        <nav className="flex items-center justify-between my-5 mx-28">
            <div>
                <Link href="/about">
                    <button className="font-bold text-2xl italic">BitTorrent Dex</button>
                </Link>
            </div>
            <div className="flex gap-10 items-center text-lg ">
                <Link href="/">
                    <button className="font-semibold uppercase">buy</button>
                </Link>
                <Link href="/about">
                    <button className="font-semibold uppercase">sell</button>
                </Link>
                <button onClick={connect} className='px-4 py-2 bg-black text-white rounded-xl'>Connect</button>
            </div>
        </nav>
    );
}
