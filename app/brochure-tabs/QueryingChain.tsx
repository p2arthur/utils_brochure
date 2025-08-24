import useQueryingChain from "@/public/tutorials/app-tutorials/querying-chain";
import CodeTutorial from "@/components/CodeTutorial";
import InteractiveQueryDemo from "@/components/InteractiveQueryDemo";
import QueryAssetTutorial from "../demos/QueryAsset";

export default function QueryingChainTutorial() {
  const demoSection = <QueryAssetTutorial />;

  const subTabs = [
    {
      id: "accountInfo",
      label: "Account Info",
      tutorialSteps: [useQueryingChain.tutorialSteps[0], useQueryingChain.tutorialSteps[1], useQueryingChain.tutorialSteps[2]],
      codeExample:
        useQueryingChain.codeTabs.find((tab) => tab.id === "algorandClient")
          ?.content || "",
      codeTabs: useQueryingChain.codeTabs.filter(
        (tab) => tab.id === "algorandClient" || tab.id === "accountInfo"
      ),
      disabled: false,
    },
    {
      id: "assetLookup",
      label: "Asset Lookup",
      tutorialSteps: [useQueryingChain.tutorialSteps[3], useQueryingChain.tutorialSteps[4], useQueryingChain.tutorialSteps[5]],
      codeExample:
        useQueryingChain.codeTabs.find((tab) => tab.id === "algorandClient")
          ?.content || "",
      codeTabs: useQueryingChain.codeTabs.filter(
        (tab) => tab.id === "algorandClient" || tab.id === "assetLookup"
      ),
      disabled: false,
    },
  ];

  return (
    <CodeTutorial
      title="Step 3: Learn How to Query the Blockchain"
      description="Discover how to retrieve account information and asset data from the Algorand blockchain."
      codeExample={useQueryingChain.codeTabs[0]?.content || ""}
      tutorialSteps={useQueryingChain.tutorialSteps}
      demoSection={demoSection}
      codeTabs={useQueryingChain.codeTabs}
      subTabs={subTabs}
      packagesInfo={useQueryingChain.packagesInfo}
    />
  );
}
