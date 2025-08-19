import WalletConnectionButton from "@/components/WalletConnectionButton";
import { useWallet } from "@txnlab/use-wallet-react";
import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function WalletConnectionDemo() {
  const { wallets, activeAccount } = useWallet();

  return (
    <div className="border-2 border-brand-blue-primary bg-brand-blue-secondary rounded-md">
      <div className="bg-brand-blue-primary text-white p-3 border-b-2 border-brand-blue-primary">
        <h3 className="font-bold">Wallet connection</h3>
      </div>
      <div className="p-6 text-center">
        <p className="mb-4 text-gray-600">
          This is the step 1 for yo uto start integrating your dapp with the
          blockchain
        </p>
        <WalletConnectionButton />
        {activeAccount && (
          <div className="mt-4 p-0 bg-green-100 border-2 border-gray-300 text-left">
            <SyntaxHighlighter
              language="javascript"
              style={tomorrow}
              customStyle={{
                margin: 0,
                backgroundColor: "#f9fafb",
                padding: "1rem",
                fontSize: "0.75rem",
                lineHeight: "1rem",
              }}
              showLineNumbers={false}
            >
              {"I can teach you how to connect your wallet"}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
}
