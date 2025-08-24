const useQueryingChain = {
  category: "querying-chain",
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
  tutorialSteps: [
    // Account Info Subtab (granular)
    {
      stepName: "Import Algorand Client",
      stepDescription: "Import the Algorand client instance for blockchain queries.",
      codeTab: "algorandClient",
      fileReference: "algorandClient.ts",
      lineRange: { start: 1, end: 4 },
    },
    {
      stepName: "Input Account Address",
      stepDescription: "Specify the Algorand address you want to query.",
      codeTab: "accountInfo",
      fileReference: "QueryService.ts",
      lineRange: { start: 1, end: 1 },
      editableFields: [
        {
          id: "accountAddress",
          label: "Account Address",
          placeholder: "Enter Algorand address to query...",
          defaultValue: "A3Q4VQFQ5DLEIWCMUX6V7YFZ7BUPWUXWY4YVNJQODUODSQ7KVEFOZUNFUQ",
          targetPattern: "{{ACCOUNT_ADDRESS}}",
          description: "Enter any valid Algorand address to query their balance",
          type: "text" as const,
        },
      ],
    },
    {
      stepName: "Query Account Information",
      stepDescription: "Fetch and display the account's address and balance.",
      codeTab: "accountInfo",
      fileReference: "QueryService.ts",
      lineRange: { start: 3, end: 10 },
    },
    // Asset Lookup Subtab (granular)
    {
      stepName: "Import Algorand Client",
      stepDescription: "Import the Algorand client instance for blockchain queries.",
      codeTab: "algorandClient",
      fileReference: "algorandClient.ts",
      lineRange: { start: 1, end: 4 },
    },
    {
      stepName: "Input Asset ID",
      stepDescription: "Specify the Algorand asset ID you want to look up.",
      codeTab: "assetLookup",
      fileReference: "QueryService.ts",
      lineRange: { start: 1, end: 1 },
      editableFields: [
        {
          id: "assetId",
          label: "Asset ID",
          placeholder: "Enter Algorand asset ID...",
          defaultValue: "10458941",
          targetPattern: "{{ASSET_ID}}",
          description: "Enter a valid Algorand asset ID to look up its details",
          type: "text" as const,
        },
      ],
    },
    {
      stepName: "Query Asset Information",
      stepDescription: "Fetch and display the asset's ID, name, and total supply.",
      codeTab: "assetLookup",
      fileReference: "QueryService.ts",
      lineRange: { start: 3, end: 11 },
    },
  ],
  // ...existing code...
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
      id: "accountInfo",
      label: "Account Info",
      language: "typescript",
      filename: "QueryService.ts",
      content: `import { algorandClient } from './algorandClient';

// Query an Algorand account's address and balance
export async function getAccountInfo(address: string) {
  const info = await algorandClient.client.indexer.lookupAccountByID(address).do();
  return {
    address: info.account.address,
    balance: info.account.amount
  };
}`,
    },
    {
      id: "assetLookup",
      label: "Asset Lookup",
      language: "typescript",
      filename: "QueryService.ts",
      content: `import { algorandClient } from './algorandClient';

// Query an Algorand asset's id, name, and total supply
export async function lookupAssetById(assetId: number) {
  const info = await algorandClient.client.algod.getAssetByID(assetId).do();
  return {
    id: info.index,
    name: info.params.name,
    total: info.params.total
  };
}`,
    },
  ],
};

export default useQueryingChain;
