import useWalletConnection from "@/public/tutorials/app-tutorials/wallet-connection";
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
          id: "network",
          label: "Network Type",
          placeholder: "TESTNET",
          defaultValue: "TESTNET",
          targetPattern: "{{NETWORK_TYPE}}",
          description: "Choose the network for your application",
          type: "dropdown" as const,
          options: ["MAINNET", "TESTNET", "LOCALNET"],
        },
        {
          id: "wallets",
          label: "Supported Wallets",
          placeholder: "Select wallets",
          defaultValue: "WalletId.PERA,WalletId.DEFLY",
          targetPattern: "{{SELECTED_WALLETS}}",
          description: "Choose which wallets your users can connect with",
          type: "checkbox" as const,
          options: [
            "WalletId.PERA",
            "WalletId.DEFLY",
            "WalletId.LUTE",
            "WalletId.DAFFI",
          ],
          defaultSelectedOptions: ["WalletId.PERA", "WalletId.DEFLY"],
        },
      ]}
    />
  );
}
