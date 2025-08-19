"use client";

import { useState } from "react";
import WalletConnectionTutorial from "./brochure-tabs/WalletConnection";
import AssetCreationTutorial from "./brochure-tabs/Transactions";
import QueryingChainTutorial from "./brochure-tabs/QueryingChain";
import BrochureTabSelector from "@/components/BrochureTabSelector";
import { FaBookAtlas } from "react-icons/fa6";
import Image from "next/image";
import WalletConnectionButton from "@/components/WalletConnectionButton";

export default function Home() {
  const [activeTab, setActiveTab] = useState("connect-wallet");

  return (
    // <WalletProvider manager={walletManager}>
    <div className="bg-white text-black">
      {/* Navbar */}
      <nav className="border-b-2 border-brand-blue-primary bg-brand-blue-secondary p-4">
        <div className="px-40 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 overflow-hidden rounded-md">
              <Image
                src="/ak_logo.png"
                alt="Algokit Logo"
                width={120}
                height={120}
              />
            </div>
            <h2 className="text-3xl font-bold">Learn</h2>
          </div>
          <WalletConnectionButton />
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
