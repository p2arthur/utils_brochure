import useAssetCreation from "@/code-examples/asset-creation";
import CodeTutorial from "@/components/CodeTutorial";
import DemoSection from "@/components/DemoSection";

export default function AssetCreationTutorial() {
  // Define which lines correspond to each step for ARC3 (default)
  const stepLineRanges = [
    { start: 1, end: 8 }, // Step 1: Import and client setup
    { start: 10, end: 19 }, // Step 2: Metadata structure
    { start: 25, end: 30 }, // Step 3: Upload to IPFS
    { start: 32, end: 49 }, // Step 4: Create transaction
  ];

  // Prepare sub-tabs data for ARC standards
  const subTabs = [
    {
      id: "arc3",
      label: "ARC3 NFT",
      tutorialSteps: useAssetCreation.arc3.tutorialSteps,
      codeExample: useAssetCreation.arc3.codeExample,
      stepLineRanges: useAssetCreation.arc3.stepLineRanges,
    },
    {
      id: "arc69",
      label: "ARC69 Asset",
      tutorialSteps: useAssetCreation.arc69.tutorialSteps,
      codeExample: useAssetCreation.arc69.codeExample,
      stepLineRanges: useAssetCreation.arc69.stepLineRanges,
    },
  ];

  const demoSection = (
    <DemoSection
      title="Asset Creation Demo"
      description="Click the button below to simulate creating an ARC3 NFT asset (demo only)"
      buttonText="Create Asset (Demo)"
      initialOutput={`// Simulating asset creation...
⏳ Connecting to Algorand TestNet...
📝 Preparing ARC3 metadata...
🌐 Uploading to IPFS...`}
      simulationOutput={`// Simulating asset creation...
⏳ Connecting to Algorand TestNet...
📝 Preparing ARC3 metadata...
🌐 Uploading to IPFS...
✅ IPFS upload successful: QmYourMetadataHash
🔨 Building asset creation transaction...
📤 Submitting to network...
✅ Asset created successfully!
🎯 Asset ID: 123456789
📋 Transaction ID: ABC123DEF456
🎉 ARC3 NFT created and confirmed!`}
    />
  );

  return (
    <CodeTutorial
      title="Step 2: Learn How to Create Assets on Algorand"
      description="Understanding asset creation enables you to build NFTs and fungible tokens following ARC3 and ARC69 standards."
      codeExample={useAssetCreation.arc3.codeExample}
      tutorialSteps={useAssetCreation.arc3.tutorialSteps}
      stepLineRanges={stepLineRanges}
      demoSection={demoSection}
      packagesInfo={useAssetCreation.packagesInfo}
      subTabs={subTabs}
    />
  );
}
