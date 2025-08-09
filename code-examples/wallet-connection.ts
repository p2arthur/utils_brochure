const useWalletConnection = {
  category: "wallet-connection",
  tutorialSteps: [
    {
      stepName: "Import wallet connection libraries",
      stepDescription: `Import the essential wallet management components from '@txnlab/use-wallet-react' including NetworkId, WalletId, WalletManager, and WalletProvider. These handle the core wallet connection logic.`,
      lineRange: { start: 1, end: 6 },
    },
    {
      stepName: "Import wallet UI components",
      stepDescription: `Import the UI components from '@txnlab/use-wallet-ui-react' including WalletUIProvider and WalletButton. These provide pre-built components for wallet interactions.`,
      lineRange: { start: 7, end: 7 },
    },
    {
      stepName: "Configure wallet manager",
      stepDescription: `Create a WalletManager instance specifying which wallets to support and set the network. You can customize both the network type and which wallets to enable.`,
      lineRange: { start: 11, end: 19 },
      editableFields: [
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
      ],
    },
    {
      stepName: "Wrap app with providers and add wallet button",
      stepDescription: `Wrap your entire application with WalletProvider and WalletUIProvider to enable wallet functionality throughout your app. Add the WalletButton component to your navbar to allow users to connect their wallets.`,
      lineRange: { start: 21, end: 39 },
    },
  ],
  packagesInfo: [
    {
      name: "@txnlab/use-wallet-react",
      version: "3.0.0",
      description:
        "A React library that provides wallet connection and management functionality for Algorand applications.",
      purpose:
        "Handles wallet connections, transaction signing, and provides React hooks for wallet state management across multiple Algorand wallets.",
      installation: "npm install @txnlab/use-wallet-react",
      documentation: "https://github.com/TxnLab/use-wallet",
    },
    {
      name: "@txnlab/use-wallet-ui-react",
      version: "3.0.0",
      description:
        "Pre-built UI components for wallet interactions, designed to work seamlessly with use-wallet-react.",
      purpose:
        "Provides ready-to-use components like WalletButton and WalletUIProvider to quickly add wallet functionality to your UI.",
      installation: "npm install @txnlab/use-wallet-ui-react",
      documentation: "https://github.com/TxnLab/use-wallet",
    },
    {
      name: "Pera Wallet",
      version: "Latest",
      description:
        "The official Algorand mobile wallet with dApp connector support.",
      purpose:
        "One of the most popular Algorand wallets that supports QR code connections for web applications.",
      installation: "Install from App Store or Google Play",
      documentation: "https://perawallet.app/",
    },
    {
      name: "Defly Wallet",
      version: "Latest",
      description:
        "A feature-rich Algorand wallet with advanced DeFi capabilities.",
      purpose:
        "Supports advanced features like portfolio tracking and DeFi integrations, popular among power users.",
      installation: "Install from App Store or Google Play",
      documentation: "https://defly.app/",
    },
    {
      name: "Lute Wallet",
      version: "Latest",
      description:
        "A lightweight and user-friendly Algorand wallet focused on simplicity.",
      purpose:
        "Provides a clean interface for basic wallet operations and dApp connections.",
      installation: "Install from App Store or Google Play",
      documentation: "https://lute.app/",
    },
    {
      name: "Daffi Wallet",
      version: "Latest",
      description:
        "An innovative Algorand wallet with unique features and design.",
      purpose:
        "Offers specialized functionality for Algorand ecosystem interactions.",
      installation: "Install from App Store or Google Play",
      documentation: "https://daffi.me/",
    },
  ],
  codeExample: `import {
  NetworkId,
  WalletId,
  WalletManager,
  WalletProvider,
} from '@txnlab/use-wallet-react'
import { WalletUIProvider, WalletButton } from '@txnlab/use-wallet-ui-react'

// Optional: Import pre-built styles if not using Tailwind
// import '@txnlab/use-wallet-ui-react/dist/style.css'

// Configure the wallets you want to use
const walletManager = new WalletManager({
  wallets: [
    {{SELECTED_WALLETS}}
  ],
  defaultNetwork: NetworkId.{{NETWORK_TYPE}},
})

function App() {
  return (
    <WalletProvider manager={walletManager}>
      <WalletUIProvider>
        <div className="min-h-screen bg-white text-black">
          <nav className="border-b-2 border-black p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">{{APP_TITLE}}</h1>
              <div className="flex gap-6">
                <WalletButton />
              </div>
            </div>
          </nav>
          
          <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome to Your Algorand App</h2>
            <p>Your wallet connection is ready!</p>
          </div>
        </div>
      </WalletUIProvider>
    </WalletProvider>
  )
}`,
};
export default useWalletConnection;
