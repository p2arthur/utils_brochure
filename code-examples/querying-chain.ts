const useQueryingChain = {
  category: "querying-chain",
  tutorialSteps: [
    {
      stepName: "Setup Indexer client",
      stepDescription: `Create an Indexer client to query historical blockchain data. The Indexer provides a more robust API for searching transactions, accounts, and assets.`,
    },
    {
      stepName: "Query account information",
      stepDescription: `Use the Indexer to fetch detailed account information including balance, assets, and transaction history. This gives you a complete view of an account's state.`,
    },
    {
      stepName: "Search transactions",
      stepDescription: `Query transactions with various filters like sender, receiver, asset ID, or transaction type. The Indexer allows complex queries to find specific transactions.`,
    },
    {
      stepName: "Handle responses and pagination",
      stepDescription: `Process the API responses and implement pagination for large datasets. The Indexer returns paginated results for performance reasons.`,
    },
  ],
  packagesInfo: [
    {
      name: "algosdk",
      version: "2.7.0",
      description:
        "The official Algorand JavaScript SDK, used here for its Indexer client functionality.",
      purpose:
        "Provides the Indexer class to query historical blockchain data with powerful search and filtering capabilities.",
      installation: "npm install algosdk",
      documentation: "https://algorand.github.io/js-algorand-sdk/",
    },
    {
      name: "Algorand Indexer",
      version: "API Service",
      description:
        "A service that provides a REST API for searching and filtering Algorand blockchain data.",
      purpose:
        "Enables complex queries on transactions, accounts, applications, and assets with pagination and filtering support.",
      installation: "Use public endpoints or run your own indexer",
      documentation: "https://developer.algorand.org/docs/rest-apis/indexer/",
    },
    {
      name: "Algonode Indexer",
      version: "API Service",
      description:
        "Free Algorand Indexer API service providing historical blockchain data access.",
      purpose:
        "Reliable infrastructure for querying blockchain history without maintaining your own indexer service.",
      installation: "No installation required - public API",
      documentation: "https://algonode.io/",
    },
  ],
  codeExample: `import algosdk from 'algosdk';

// Configure Indexer client for TestNet
const indexerClient = new algosdk.Indexer(
  '', // token
  'https://testnet-idx.algonode.cloud', // server  
  443 // port
);

// Query account information
async function getAccountInfo(address: string) {
  try {
    const accountInfo = await indexerClient
      .lookupAccountByID(address)
      .do();
      
    console.log('Account balance:', accountInfo.account.amount);
    console.log('Assets:', accountInfo.account.assets);
    return accountInfo.account;
  } catch (error) {
    console.error('Failed to fetch account:', error);
  }
}

// Search for transactions
async function searchTransactions(address: string, limit = 10) {
  try {
    const txnResponse = await indexerClient
      .searchForTransactions()
      .address(address)
      .limit(limit)
      .do();
      
    console.log('Found transactions:', txnResponse.transactions.length);
    return txnResponse.transactions;
  } catch (error) {
    console.error('Failed to search transactions:', error);
  }
}

// Get asset information
async function getAssetInfo(assetId: number) {
  try {
    const assetInfo = await indexerClient
      .lookupAssetByID(assetId)
      .do();
      
    console.log('Asset name:', assetInfo.asset.params.name);
    return assetInfo.asset;
  } catch (error) {
    console.error('Failed to fetch asset:', error);
  }
}`,
};

export default useQueryingChain;
