import WalletConnectionButton from "@/components/WalletConnectionButton";
import { useWallet } from "@txnlab/use-wallet-react";
import { useState } from "react";
import * as algokit from "@algorandfoundation/algokit-utils";

export default function AssetCreationDemo() {
  const { activeWallet, activeAccount, transactionSigner } = useWallet();

  const [assetName, setAssetName] = useState("");
  const [totalUnits, setTotalUnits] = useState<string>("");

  // Replace this with your real asset-creation logic
  const handleAssetCreation = async () => {
    const algorandClient = algokit.AlgorandClient.testNet();

    // Basic guard
    if (!activeWallet || !activeAccount) return;

    const units = Number(totalUnits);
    if (!assetName.trim() || !Number.isFinite(units) || units <= 0) {
      alert(
        "Please provide a valid asset name and a positive total units value."
      );
      return;
    }

    const createdAssetTxnId = await algorandClient.send.assetCreate({
      sender: activeAccount.address,
      signer: transactionSigner,
      total: BigInt(units),
      assetName,
      unitName: assetName.slice(0, 8), // ASA unit name max 8 chars
      decimals: 0, // or set as needed
    });

    await algokit.waitForConfirmation(
      createdAssetTxnId.txIds[0],
      3,
      algorandClient.client.algod
    );
  };

  const formDisabled =
    !assetName.trim() ||
    !Number.isFinite(Number(totalUnits)) ||
    Number(totalUnits) <= 0;

  return (
    <div className="border-2 border-brand-blue-primary bg-brand-blue-secondary rounded-md">
      <div className="bg-brand-blue-primary text-white p-3 border-b-2 border-brand-blue-primary">
        <h3 className="font-bold">Asset creation</h3>
      </div>

      <div className="p-6">
        {!activeWallet ? (
          <div className="text-center">
            <p className="mb-4 text-gray-600">
              Connect your wallet to create an Algorand Standard Asset (ASA).
            </p>
            <WalletConnectionButton />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700">
              Connected as{" "}
              <span className="font-mono">{activeAccount?.address}</span>
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col">
                <label
                  htmlFor="assetName"
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  Asset name
                </label>
                <input
                  id="assetName"
                  type="text"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  placeholder="e.g., WeDev Token"
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-primary"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="totalUnits"
                  className="mb-1 text-sm font-medium text-gray-700"
                >
                  Total units
                </label>
                <input
                  id="totalUnits"
                  type="number"
                  min={1}
                  step={1}
                  value={totalUnits}
                  onChange={(e) => setTotalUnits(e.target.value)}
                  placeholder="e.g., 1_000_000"
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-primary"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleAssetCreation}
                disabled={formDisabled}
                className={`w-full md:w-auto rounded-md px-4 py-2 font-semibold text-white ${
                  formDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-brand-blue-primary hover:opacity-90"
                }`}
              >
                Create asset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
