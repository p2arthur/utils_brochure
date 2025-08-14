"use client";

import { useState } from "react";
import WalletConnectionTutorial from "./brochure-tabs/WalletConnection";
import AssetCreationTutorial from "./brochure-tabs/Transactions";
import QueryingChainTutorial from "./brochure-tabs/QueryingChain";
import BrochureTabSelector from "@/components/BrochureTabSelector";
import { FaBookAtlas } from "react-icons/fa6";

export default function Home() {
  const [activeTab, setActiveTab] = useState("connect-wallet");

  return (
    // <WalletProvider manager={walletManager}>
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="border-b-2 border-brand-blue-primary p-4">
        <div className="px-40 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h1 className="text-xl font-bold">Algokit Learn</h1>
            <FaBookAtlas />
          </div>
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
      <div className="px-40 py-6">
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
