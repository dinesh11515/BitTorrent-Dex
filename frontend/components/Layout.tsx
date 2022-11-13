import { createContext, useState } from "react";
import NavBar from "../components/Navbar";
import { ReactNode } from "react";
import { ethers } from "ethers";
interface Prop {
  children?: ReactNode;
}

interface window {
  tronweb: any;
}

export const dexContext: any = createContext({});

export default function Layout({ children }: Prop) {
  const [connected, setConnected] = useState(false);
  const networks = {
    bttc: {
      chainId: `0x${Number(1029).toString(16)}`,
      chainName: "BTTC-testnet",
      nativeCurrency: {
        name: "BTTC",
        symbol: "BTT",
        decimals: 18,
      },
      rpcUrls: ["https://pre-rpc.bt.io/"],
      blockExplorerUrls: ["https://testnet.bttcscan.com/"],
    },
  };
  const connect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      if ((await signer.getChainId()) != 80001) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks["bttc"],
            },
          ],
        });
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <dexContext.Provider
      value={{
        connect,
      }}
    >
      <NavBar />
      {children}
    </dexContext.Provider>
  );
}
