import { createContext, useState } from "react";
import NavBar from "../components/Navbar";
import { ReactNode } from "react";
import { ethers } from "ethers";
import { contract_address, contract_abi } from "../constants/index";
interface Prop {
  children?: ReactNode;
}


export const dexContext: any = createContext({});

export default function Layout({ children }: Prop) {
  const [connected, setConnected] = useState(false);
  const [contract, setContract] = useState<any>();
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
      if ((await signer.getChainId()) != 1028) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks["bttc"],
            },
          ],
        });
      }
      const contract = new ethers.Contract(
        contract_address,
        contract_abi,
        signer
      );
      setContract(contract);
      setConnected(true);

    } catch (e) {
      alert(e);
    }
  };
  return (
    <dexContext.Provider
      value={{
        connect,
        contract,
        connected
      }}
    >
      <NavBar />
      {children}
    </dexContext.Provider>
  );
}
