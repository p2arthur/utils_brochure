import useAssetCreation from "@/code-examples/asset-creation";
import CodeTutorial from "@/components/CodeTutorial";
import DemoSection from "@/components/DemoSection";

export default function AssetCreationTutorial() {
  // Prepare sub-tabs data for ARC standards
  const subTabs = [
    {
      id: "arc3",
      label: "ARC3 Asset",
      tutorialSteps: useAssetCreation.arc3.tutorialSteps,
      codeExample: useAssetCreation.arc3.codeExample,
    },
    {
      id: "arc69",
      label: "ARC69 Asset",
      tutorialSteps: useAssetCreation.arc69.tutorialSteps,
      codeExample: useAssetCreation.arc69.codeExample,
    },
  ];

  const demoSection = (
    <DemoSection
      title="Asset Creation Demo"
      description="Click the button below to simulate creating an ARC3 asset (demo only)"
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
🎉 ARC3 asset created and confirmed!`}
    />
  );

  return (
    <CodeTutorial
      title="Step 2: Learn How to Create Assets on Algorand"
      description="Understanding asset creation enables you to build NFTs and fungible tokens following ARC3 and ARC69 standards."
      codeExample={useAssetCreation.arc3.codeExample}
      tutorialSteps={useAssetCreation.arc3.tutorialSteps}
      demoSection={demoSection}
      packagesInfo={useAssetCreation.packagesInfo}
      subTabs={subTabs}
    />
  );
}
