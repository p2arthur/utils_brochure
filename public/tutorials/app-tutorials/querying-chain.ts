const useQueryingChain = {
  category: "querying-chain",
  tutorialSteps: [
    {
      stepName: "Import and setup Indexer client",
      stepDescription: `Import algosdk and initialize Indexer client using environment variables. The Indexer provides a robust API for searching transactions, accounts, and assets.`,
      codeTab: "main",
      fileReference: "QueryService.ts",
      lineRange: { start: 1, end: 8 },
      editableFields: [
        {
          id: "networkType",
          label: "Network Type",
          placeholder: "testnet",
          defaultValue: "testnet",
          targetPattern: "{{NETWORK_TYPE}}",
          description: "Choose the Algorand network to query",
          type: "dropdown" as const,
          options: ["mainnet", "testnet"],
        },
      ],
    },
    {
      stepName: "Setup Algod client",
      stepDescription: `Initialize Algod client for transaction operations. Both Indexer and Algod clients work together to provide comprehensive blockchain access.`,
      codeTab: "main",
      fileReference: "QueryService.ts",
      lineRange: { start: 10, end: 15 },
    },
    {
      stepName: "Query account information",
      stepDescription: `Create a service method to fetch detailed account information including balance, assets, and transaction history. Input any Algorand address to see what assets they own.`,
      codeTab: "main",
      fileReference: "QueryService.ts",
      lineRange: { start: 18, end: 35 },
      editableFields: [
        {
          id: "accountAddress",
          label: "Account Address",
          placeholder: "Enter Algorand address to query...",
          defaultValue:
            "ACCOUNTADDRESSHERE23XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          targetPattern: "{{ACCOUNT_ADDRESS}}",
          description:
            "Enter any valid Algorand address to query their assets and balance",
          type: "text" as const,
        },
      ],
    },
    {
      stepName: "Search transactions with filters",
      stepDescription: `Implement transaction search with various filters like sender, receiver, asset ID, or transaction type. Use the same address to find their transaction history.`,
      codeTab: "main",
      fileReference: "QueryService.ts",
      lineRange: { start: 42, end: 70 },
    },
    {
      stepName: "Handle responses and pagination",
      stepDescription: `Process the API responses and implement pagination for large datasets. The Indexer returns paginated results for performance reasons.`,
      codeTab: "main",
      fileReference: "QueryService.ts",
      lineRange: { start: 34, end: 44 },
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
      .lookupAccountByID('{{ACCOUNT_ADDRESS}}')
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
      .address('{{ACCOUNT_ADDRESS}}')
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
  codeTabs: [
    {
      id: "main",
      label: "QueryService.ts",
      language: "typescript",
      filename: "QueryService.ts",
      content: `import algosdk from 'algosdk';

// Initialize Indexer client using environment variables
const indexerClient = new algosdk.Indexer(
  process.env.INDEXER_TOKEN || '', 
  process.env.INDEXER_SERVER || 'https://testnet-idx.algonode.cloud',
  Number(process.env.INDEXER_PORT) || 443
);

// Initialize Algod client for transaction operations
const algodClient = new algosdk.Algodv2(
  process.env.ALGOD_TOKEN || '',
  process.env.ALGOD_SERVER || 'https://testnet-api.algonode.cloud',
  Number(process.env.ALGOD_PORT) || 443
);

export class AlgorandQueryService {
  // Query account information with detailed asset data
  static async getAccountInfo(address: string) {
    try {
      const accountInfo = await indexerClient
        .lookupAccountByID('{{ACCOUNT_ADDRESS}}')
        .do();
        
      console.log('Account balance:', accountInfo.account.amount);
      console.log('Assets owned:', accountInfo.account.assets?.length || 0);
      
      return {
        address: accountInfo.account.address,
        balance: accountInfo.account.amount,
        assets: accountInfo.account.assets || [],
        apps: accountInfo.account['apps-local-state'] || [],
        totalAppsOptedIn: accountInfo.account['total-apps-opted-in'] || 0,
        totalAssetsOptedIn: accountInfo.account['total-assets-opted-in'] || 0
      };
    } catch (error) {
      console.error('Failed to fetch account:', error);
      throw error;
    }
  }

  // Search transactions with pagination support
  static async searchTransactions(address: string, options: {
    limit?: number;
    txType?: string;
    assetId?: number;
    minRound?: number;
    maxRound?: number;
  } = {}) {
    try {
      let query = indexerClient
        .searchForTransactions()
        .address('{{ACCOUNT_ADDRESS}}')
        .limit(options.limit || 10);

      if (options.txType) query = query.txType(options.txType);
      if (options.assetId) query = query.assetID(options.assetId);
      if (options.minRound) query = query.minRound(options.minRound);
      if (options.maxRound) query = query.maxRound(options.maxRound);

      const txnResponse = await query.do();
      
      console.log('Found transactions:', txnResponse.transactions.length);
      console.log('Next token:', txnResponse['next-token']);
      
      return {
        transactions: txnResponse.transactions,
        nextToken: txnResponse['next-token'],
        currentRound: txnResponse['current-round']
      };
    } catch (error) {
      console.error('Failed to search transactions:', error);
      throw error;
    }
  }

  // Get detailed asset information
  static async getAssetInfo(assetId: number) {
    try {
      const assetInfo = await indexerClient
        .lookupAssetByID(assetId)
        .do();
        
      const asset = assetInfo.asset;
      console.log('Asset name:', asset.params.name);
      console.log('Total supply:', asset.params.total);
      
      return {
        id: asset.index,
        name: asset.params.name,
        unitName: asset.params['unit-name'],
        total: asset.params.total,
        decimals: asset.params.decimals,
        creator: asset.params.creator,
        url: asset.params.url,
        metadataHash: asset.params['metadata-hash']
      };
    } catch (error) {
      console.error('Failed to fetch asset:', error);
      throw error;
    }
  }

  // Get network status and parameters
  static async getNetworkInfo() {
    try {
      const status = await algodClient.status().do();
      const params = await algodClient.getTransactionParams().do();
      
      return {
        network: process.env.ALGOD_NETWORK || 'testnet',
        lastRound: status['last-round'],
        timeSinceLastRound: status['time-since-last-round'],
        catchupTime: status['catchup-time'],
        minFee: params.fee,
        genesisHash: params.genesishashb64
      };
    } catch (error) {
      console.error('Failed to get network info:', error);
      throw error;
    }
  }
}`,
    },
    {
      id: "env",
      label: "Environment",
      language: "bash",
      filename: ".env.local",
      content: `# ======================
# LocalNet configuration
# uncomment below to use
# ======================

ALGORAND_ENVIRONMENT=local

# Algod
ALGOD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
ALGOD_SERVER=http://localhost
ALGOD_PORT=4001
ALGOD_NETWORK=localnet

# Indexer
INDEXER_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
INDEXER_SERVER=http://localhost
INDEXER_PORT=8980

# KMD
# Please note:
# 1. This is only needed for LocalNet since
# by default KMD provider is ignored on other networks.
# 2. AlgoKit LocalNet starts with a single wallet called 'unencrypted-default-wallet',
# with heaps of tokens available for testing.
KMD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
KMD_SERVER=http://localhost
KMD_PORT=4002
KMD_WALLET="unencrypted-default-wallet"
KMD_PASSWORD=""

# ======================
# TestNet configuration:
# uncomment below to use
# ======================

# ALGORAND_ENVIRONMENT=testnet

# # Algod
# ALGOD_TOKEN=""
# ALGOD_SERVER="https://testnet-api.algonode.cloud"
# ALGOD_PORT=""
# ALGOD_NETWORK="testnet"

# # Indexer
# INDEXER_TOKEN=""
# INDEXER_SERVER="https://testnet-idx.algonode.cloud"
# INDEXER_PORT=""

# ======================
# MainNet configuration:
# uncomment below to use
# ======================

# ALGORAND_ENVIRONMENT=mainnet

# # Algod
# ALGOD_TOKEN=""
# ALGOD_SERVER="https://mainnet-api.algonode.cloud"
# ALGOD_PORT=""
# ALGOD_NETWORK="mainnet"

# # Indexer
# INDEXER_TOKEN=""
# INDEXER_SERVER="https://mainnet-idx.algonode.cloud"
# INDEXER_PORT=""

# Query Configuration
DEFAULT_QUERY_ADDRESS={{ACCOUNT_ADDRESS}}

# Development and Debugging
DEBUG_QUERIES=false
LOG_API_CALLS=false`,
    },
    {
      id: "package",
      label: "Package",
      language: "json",
      filename: "package.json",
      content: `{
  "name": "algorand-query-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "algosdk": "^2.7.0",
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0", 
    "@types/react-dom": "^18.2.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "14.0.0",
    "tailwindcss": "^3.3.0"
  }
}`,
    },
  ],
};

export default useQueryingChain;
