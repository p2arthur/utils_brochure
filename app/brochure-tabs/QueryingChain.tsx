import useQueryingChain from "@/public/tutorials/app-tutorials/querying-chain";
import CodeTutorial from "@/components/CodeTutorial";
import InteractiveQueryDemo from "@/components/InteractiveQueryDemo";

export default function QueryingChainTutorial() {
  const demoSection = (
    <InteractiveQueryDemo
      title="Interactive Blockchain Query Demo"
      description="Enter any Algorand address below to query their assets and account information in real-time. This demo simulates the Indexer API calls shown in the code example."
    />
  );

  return (
    <CodeTutorial
      title="Step 3: Learn How to Query the Blockchain"
      description="Discover how to retrieve account information, transaction history, and asset data from the Algorand blockchain using the Indexer API."
      codeExample={useQueryingChain.codeExample}
      tutorialSteps={useQueryingChain.tutorialSteps}
      demoSection={demoSection}
      packagesInfo={useQueryingChain.packagesInfo}
      codeTabs={useQueryingChain.codeTabs}
    />
  );
}
