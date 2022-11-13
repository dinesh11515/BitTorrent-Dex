import Link from "next/link";
import { useContext } from "react";
import { dexContext } from "../components/Layout";
export default function Navbar() {
    const {connect,connected} :any= useContext(dexContext);
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
                <Link href="/sell">
                    <button className="font-semibold uppercase">sell</button>
                </Link>
                <Link href="/register">
                    <button className="font-semibold uppercase">register</button>
                </Link>
                {
                    connected ? <button className="font-semibold uppercase px-4 py-2 bg-black text-white rounded-xl" >connected</button> : <button onClick={connect} className="font-semibold uppercase px-4 py-2 bg-black text-white rounded-xl">connect</button>
                }
            </div>
        </nav>
    );
}
