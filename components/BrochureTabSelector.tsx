interface BrochureTabSelectorProps {
  activeTab: string;
  setterFunction: (tab: string) => void;
}

export default function BrochureTabSelector({
  setterFunction,
  activeTab,
}: BrochureTabSelectorProps) {
  const brochureTabs = [
    { name: "Easily connecting Wallets", value: "connect-wallet" },
    { name: "Creating Assets (ARC3/ARC69)", value: "transactions" },
    { name: "Querying the blockchain", value: "querying-chain" },
  ];

  return (
    <div className="border-b-2 border-black mb-8">
      <div className="flex gap-0">
        {brochureTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setterFunction(tab.value)}
            className={`px-6 py-3 border-2 border-black border-b-0 font-medium ${
              activeTab === tab.value
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
}
