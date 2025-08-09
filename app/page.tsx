"use client";

import { useState } from "react";
import WalletConnectionTutorial from "./brochure-tabs/WalletConnection";
import AssetCreationTutorial from "./brochure-tabs/Transactions";
import QueryingChainTutorial from "./brochure-tabs/QueryingChain";
import BrochureTabSelector from "@/components/BrochureTabSelector";

// import {
//   NetworkId,
//   WalletId,
//   WalletManager,
//   WalletProvider,
// } from "@txnlab/use-wallet-react";

// import { WalletUIProvider, WalletButton } from "@txnlab/use-wallet-ui-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("connect-wallet");

  // const walletManager = new WalletManager({
  //   wallets: [
  //     // WalletId.PERA,
  //     // WalletId.DEFLY,
  //     // WalletId.LUTE,
  //     // Add more wallets as needed
  //   ],
  //   defaultNetwork: NetworkId.TESTNET,
  // });
  return (
    // <WalletProvider manager={walletManager}>
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="border-b-2 border-black p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Algorand Educational Hub</h1>
          <div className="flex gap-6">
            <a href="#" className="hover:underline font-medium">
              Algokit
            </a>
            <a href="#" className="hover:underline font-medium">
              Examples Gallery
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <BrochureTabSelector
          setterFunction={setActiveTab}
          activeTab={activeTab}
        />

        {/* Tab Content */}
        {activeTab === "connect-wallet" && <WalletConnectionTutorial />}
        {activeTab === "transactions" && <AssetCreationTutorial />}
        {activeTab === "querying-chain" && <QueryingChainTutorial />}
      </div>
    </div>
    // </WalletProvider>
  );
}
