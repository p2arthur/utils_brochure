import { MdAccountBalanceWallet, MdToken, MdSearch } from "react-icons/md";

interface BrochureTabSelectorProps {
  activeTab: string;
  setterFunction: (tab: string) => void;
}

export default function BrochureTabSelector({
  setterFunction,
  activeTab,
}: BrochureTabSelectorProps) {
  const brochureTabs = [
    {
      name: "Easily connecting Wallets",
      value: "connect-wallet",
      icon: MdAccountBalanceWallet,
    },
    {
      name: "Creating Assets (WIP)",
      value: "transactions",
      icon: MdToken,
    },
    {
      name: "Querying the blockchain (WIP)",
      value: "querying-chain",
      icon: MdSearch,
    },
  ];

  return (
    <div className="">
      <div className="flex gap-0">
        <div className="flex rounded-t-md overflow-hidden border-b-2 border-brand-blue-primary">
          {brochureTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.value}
                onClick={() => setterFunction(tab.value)}
                className={`px-6 py-3 border-b-0 font-medium flex items-center gap-2 ${
                  activeTab === tab.value
                    ? "bg-brand-blue-primary text-white" // Use custom color for active tab
                    : "bg-brand-blue-secondary text-black hover:bg-gray-100"
                }`}
              >
                <IconComponent className="text-lg" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
