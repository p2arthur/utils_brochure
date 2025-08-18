import useWalletConnection from "@/code-examples/wallet-connection";
import CodeTutorial from "@/components/CodeTutorial";
import DemoSection from "@/components/DemoSection";
import WalletConnectionDemo from "../demos/WalletConnectionDemo";

export default function WalletConnectionTutorial() {
  const demoSection = <WalletConnectionDemo />;

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
