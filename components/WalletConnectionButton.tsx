import { useWallet } from "@txnlab/use-wallet-react";
import { useState } from "react";
import Image from "next/image";
import {} from "@algorandfoundation/algokit-utils";
import { MdDoorBack } from "react-icons/md";

function truncate(addr: string, start = 6, end = 4) {
  if (!addr) return "";
  return `${addr.slice(0, start)}...${addr.slice(-end)}`;
}

export default function WalletConnectionButton() {
  const { wallets, activeAccount, activeWallet } = useWallet();
  const [optionsAreOpen, setOptionsAreOpen] = useState(false);

  const toggleOptions = () => setOptionsAreOpen((s) => !s);

  // If connected, just show the address
  if (activeAccount?.address) {
    return (
      <div className="rounded-md overflow-hidden">
        <div className="flex">
          <button
            type="button"
            className="px-3 py-2 bg-brand-blue-primary border text-sm font-medium text-white"
            title={activeAccount.address}
          >
            {truncate(activeAccount.address)}
          </button>
          <button
            className="bg-red-500 text-white p-2"
            onClick={activeWallet?.disconnect}
          >
            <MdDoorBack />
          </button>
        </div>
      </div>
    );
  }

  // Not connected: show a Connect button; clicking reveals options
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={toggleOptions}
        className="px-4 py-2 rounded-md bg-brand-blue-primary text-white text-sm font-medium"
      >
        Connect
      </button>

      {optionsAreOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-lg border bg-white shadow">
          <div className="py-1">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={async () => {
                  try {
                    await wallet.connect();
                  } finally {
                    setOptionsAreOpen(false);
                  }
                }}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left"
              >
                <Image
                  src={wallet.metadata.icon}
                  alt={wallet.metadata.name}
                  width={24}
                  height={24}
                />
                <span className="font-medium">{wallet.metadata.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
