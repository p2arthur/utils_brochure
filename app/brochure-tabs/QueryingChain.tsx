import useQueryingChain from "@/code-examples/querying-chain";
import CodeTutorial from "@/components/CodeTutorial";
import DemoSection from "@/components/DemoSection";

export default function QueryingChainTutorial() {
  // Define which lines correspond to each step
  const stepLineRanges = [
    { start: 3, end: 7 }, // Step 1: Setup Indexer client
    { start: 9, end: 19 }, // Step 2: Query account information
    { start: 21, end: 32 }, // Step 3: Search transactions
    { start: 34, end: 44 }, // Step 4: Get asset information
  ];

  const demoSection = (
    <DemoSection
      title="Try It Yourself"
      description="Click the button below to simulate querying blockchain data (demo only)"
      buttonText="Query Blockchain (Demo)"
      initialOutput={`// Ready to query blockchain...
🔍 Target: Account info & transactions
📡 Network: Algorand TestNet
⏳ Waiting for user action...`}
      simulationOutput={`// Simulating blockchain query...
🔍 Querying account information...
💰 Account balance: 15.750000 ALGO
🎨 Assets owned: 3 assets found
📜 Searching recent transactions...
🔍 Found 25 transactions
📊 Latest transaction: Payment of 2.5 ALGO
🆔 Transaction ID: DEF456...UVW123
✅ Query completed successfully!`}
    />
  );

  return (
    <CodeTutorial
      title="Step 3: Learn How to Query the Blockchain"
      description="Discover how to retrieve account information, transaction history, and asset data from the Algorand blockchain."
      codeExample={useQueryingChain.codeExample}
      tutorialSteps={useQueryingChain.tutorialSteps}
      stepLineRanges={stepLineRanges}
      demoSection={demoSection}
      packagesInfo={useQueryingChain.packagesInfo}
    />
  );
}
