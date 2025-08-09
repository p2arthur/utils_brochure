import { SubTabData } from "./CodeTutorial";

interface SubTabSelectorProps {
  subTabs: SubTabData[];
  activeSubTab: string;
  onSubTabChange: (subTabId: string) => void;
}

export default function SubTabSelector({
  subTabs,
  activeSubTab,
  onSubTabChange,
}: SubTabSelectorProps) {
  if (!subTabs || subTabs.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="flex gap-1 border border-gray-300">
        {subTabs.map((subTab) => (
          <button
            key={subTab.id}
            onClick={() => onSubTabChange(subTab.id)}
            className={`px-3 py-2 text-sm font-medium ${
              activeSubTab === subTab.id
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          >
            {subTab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
