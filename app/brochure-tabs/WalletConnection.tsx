import useWalletConnection from "@/code-examples/wallet-connection";
import CodeTutorial from "@/components/CodeTutorial";
import DemoSection from "@/components/DemoSection";

export default function WalletConnectionTutorial() {
  const demoSection = (
    <DemoSection
      title="Try It Yourself"
      description="Click the button below to simulate a wallet connection (demo only)"
      buttonText="Connect Wallet (Demo)"
      initialOutput={`// Simulating wallet connection...
⏳ Initializing PeraWalletConnect...
🔗 Opening QR code modal...
📱 Waiting for user to scan QR code...`}
      simulationOutput={`// Simulating wallet connection...
⏳ Initializing PeraWalletConnect...
🔗 Opening QR code modal...
📱 Waiting for user to scan QR code...
✅ Connection successful!
📝 Connected accounts: ["ABCD...XYZ123"]
🎉 Wallet connected successfully!`}
    />
  );

  return (
    <CodeTutorial
      title="Step 1: Learn How to Connect Wallets to Your App"
      description="Understanding wallet connection is the first step in building Algorand applications. Learn step-by-step how to integrate wallet connectivity."
      codeExample={useWalletConnection.codeExample}
      tutorialSteps={useWalletConnection.tutorialSteps}
      demoSection={demoSection}
      packagesInfo={useWalletConnection.packagesInfo}
      codeTabs={useWalletConnection.codeTabs}
      editableFields={[
        {
          id: "appTitle",
          label: "App Title",
          placeholder: "My Algorand App",
          defaultValue: "My Algorand App",
          targetPattern: "{{APP_TITLE}}",
          description: "The title shown in your app's navigation",
          type: "text" as const,
        },
      ]}
    />
  );
}
