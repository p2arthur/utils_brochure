// Asset creation tutorial for native assets
const useAssetCreation = {
  native_asset: {
    tutorialSteps: [
      {
        stepName: "Import Algorand Client",
        stepDescription:
          "Import and configure the Algorand client using algokit.",
        codeTab: "algorandClient",
        fileReference: "algorandClient.ts",
        lineRange: { start: 1, end: 4 },
      },
      {
        stepName: "Define Asset Parameters",
        stepDescription:
          "Set up the parameters for your Algorand Standard Asset (ASA).",
        codeTab: "assetCreation",
        fileReference: "AssetCreation.ts",
        lineRange: { start: 1, end: 15 },
        editableFields: [
          {
            id: "unitName",
            label: "Unit Name",
            placeholder: "MYCOIN",
            defaultValue: "MYCOIN",
            targetPattern: "MYCOIN",
            description: "The short name for your asset (e.g. USDC, BTC)",
            type: "text" as const,
          },
          {
            id: "assetName",
            label: "Asset Name",
            placeholder: "My Example Coin",
            defaultValue: "My Example Coin",
            targetPattern: "My Example Coin",
            description: "The full name of your asset",
            type: "text" as const,
          },
        ],
      },
      {
        stepName: "Create the Asset",
        stepDescription:
          "Call the Algorand client to create the asset on chain.",
        codeTab: "assetCreation",
        fileReference: "AssetCreation.ts",
        lineRange: { start: 17, end: 29 },
      },
    ],
    codeTabs: [
      {
        id: "algorandClient",
        label: "algorandClient.ts",
        language: "typescript",
        filename: "algorandClient.ts",
        content: `import * as algokit from '@algorandfoundation/algokit-utils';

// Create and export a configured Algorand client for TestNet
export const algorandClient = algokit.AlgorandClient.testNet();
`,
      },
      {
        id: "assetCreation",
        label: "AssetCreation.ts",
        language: "typescript",
        filename: "AssetCreation.ts",
        content: `import { algorandClient } from './algorandClient';

// Define parameters for the new asset
const assetParams = {
  total: 1000000, // Total supply
  decimals: 0, // No decimals
  defaultFrozen: false,
  unitName: 'MYCOIN',
  assetName: 'My Example Coin',
  manager: 'A3Q4VQFQ5DLEIWCMUX6V7YFZ7BUPWUXWY4YVNJQODUODSQ7KVEFOZUNFUQ',
  reserve: undefined,
  freeze: undefined,
  clawback: undefined,
  url: 'https://example.com',
  metadataHash: undefined,
};

// Create the asset on Algorand
export async function createAsset(sender: string, sk: Uint8Array) {
  const suggested = await algorandClient.client.algod.getTransactionParams().do();
  const txn = algorandClient.algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from: sender,
    ...assetParams,
    suggestedParams: suggested,
  });
  // Sign and send the transaction (replace with your wallet logic)
  // const signedTxn = txn.signTxn(sk);
  // const { txId } = await algorandClient.client.algod.sendRawTransaction(signedTxn).do();
  // return txId;
  return txn;
}
`,
      },
    ],
    packagesInfo: [
      {
        name: "@algorandfoundation/algokit-utils",
        version: "latest",
        description:
          "Algorand Foundation's utility toolkit for interacting with the Algorand blockchain.",
        purpose:
          "Simplifies Algorand client setup and common blockchain operations.",
        installation: "npm install @algorandfoundation/algokit-utils",
        documentation: "https://github.com/algorandfoundation/algokit-utils-ts",
      },
      {
        name: "algosdk",
        version: "^2.7.0",
        description: "Official Algorand JavaScript SDK.",
        purpose:
          "Low-level access to Algorand blockchain, transactions, and indexer.",
        installation: "npm install algosdk",
        documentation: "https://algorand.github.io/js-algorand-sdk/",
      },
    ],
  },
};

export default useAssetCreation;
