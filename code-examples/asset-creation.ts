const useAssetCreation = {
  category: "asset-creation",

  // Common tutorial steps for asset creation
  tutorialSteps: [
    {
      stepName: "Import required modules",
      stepDescription: `Import algosdk for blockchain interactions and the asset creation utilities. We also import IPFS utilities for metadata storage.`,
    },
    {
      stepName: "Configure clients",
      stepDescription: `Set up Algod client for network communication and optionally an IPFS client for metadata storage.`,
    },
    {
      stepName: "Prepare asset parameters",
      stepDescription: `Define the asset parameters including name, unit name, total supply, decimals, and metadata according to the chosen standard.`,
    },
    {
      stepName: "Create and submit transaction",
      stepDescription: `Build the asset creation transaction with the prepared parameters and submit it to the network.`,
    },
  ],

  // ARC3 specific data
  arc3: {
    tutorialSteps: [
      {
        stepName: "Import ARC3 utilities",
        stepDescription: `Import algosdk and any ARC3-specific utilities for creating NFTs with rich metadata stored on IPFS.`,
      },
      {
        stepName: "Prepare IPFS metadata",
        stepDescription: `Create the ARC3-compliant metadata JSON structure and upload it to IPFS to get the metadata hash.`,
      },
      {
        stepName: "Configure ARC3 parameters",
        stepDescription: `Set up asset parameters for ARC3 NFT: total supply of 1, decimals of 0, and the IPFS metadata URL.`,
      },
      {
        stepName: "Create NFT transaction",
        stepDescription: `Build and submit the asset creation transaction with ARC3-compliant parameters.`,
      },
    ],
    codeExample: `import algosdk from 'algosdk';
import { WalletTransaction } from '@txnlab/use-wallet-react';

// Configure Algod client
const algodClient = new algosdk.Algodv2(
  '', 
  'https://testnet-api.algonode.cloud', 
  443
);

// ARC3 metadata structure
const arc3Metadata = {
  name: "My ARC3 NFT",
  description: "A unique NFT following ARC3 standard",
  image: "ipfs://QmYourImageHash",
  image_integrity: "sha256-hash",
  image_mimetype: "image/png",
  properties: {
    trait_type: "Color",
    value: "Blue"
  }
};

async function createARC3Asset(
  creator: string,
  signTransactions: (txns: WalletTransaction[]) => Promise<Uint8Array[]>
) {
  try {
    // Upload metadata to IPFS (pseudo code)
    const metadataHash = await uploadToIPFS(arc3Metadata);
    const metadataURL = \`ipfs://\${metadataHash}\`;
    
    // Get suggested parameters
    const suggestedParams = await algodClient.getTransactionParams().do();
    
    // Create ARC3 asset transaction
    const assetCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: creator,
      total: 1, // NFT has supply of 1
      decimals: 0, // NFTs are not divisible
      assetName: "MyARC3NFT",
      unitName: "ARC3",
      assetURL: metadataURL,
      assetMetadataHash: new Uint8Array(Buffer.from(metadataHash, 'hex').slice(0, 32)),
      defaultFrozen: false,
      freeze: creator,
      manager: creator,
      reserve: creator,
      clawback: creator,
      suggestedParams: suggestedParams,
    });

    // Sign and submit
    const signedTxns = await signTransactions([{ txn: assetCreateTxn }]);
    const { txId } = await algodClient.sendRawTransaction(signedTxns[0]).do();
    
    console.log('ARC3 NFT created:', txId);
    return txId;
  } catch (error) {
    console.error('ARC3 creation failed:', error);
    throw error;
  }
}`,
    stepLineRanges: [
      { start: 1, end: 7 }, // Import and client setup
      { start: 9, end: 19 }, // Metadata structure
      { start: 26, end: 28 }, // Upload to IPFS
      { start: 32, end: 48 }, // Create transaction
    ],
  },

  // ARC69 specific data
  arc69: {
    tutorialSteps: [
      {
        stepName: "Import ARC69 utilities",
        stepDescription: `Import algosdk for ARC69 assets. ARC69 stores metadata on-chain in the asset note field.`,
      },
      {
        stepName: "Prepare on-chain metadata",
        stepDescription: `Create ARC69-compliant metadata structure that will be stored directly in the transaction note.`,
      },
      {
        stepName: "Configure ARC69 parameters",
        stepDescription: `Set up asset parameters for ARC69: can be fungible or non-fungible, metadata stored in note field.`,
      },
      {
        stepName: "Create ARC69 transaction",
        stepDescription: `Build and submit the asset creation transaction with metadata in the note field.`,
      },
    ],
    codeExample: `import algosdk from 'algosdk';
import { WalletTransaction } from '@txnlab/use-wallet-react';

// Configure Algod client
const algodClient = new algosdk.Algodv2(
  '', 
  'https://testnet-api.algonode.cloud', 
  443
);

// ARC69 metadata (stored on-chain)
const arc69Metadata = {
  standard: "arc69",
  description: "My ARC69 asset with on-chain metadata",
  external_url: "https://myproject.com",
  mime_type: "image/png",
  properties: {
    trait_type: "Background",
    value: "Sunset"
  }
};

async function createARC69Asset(
  creator: string,
  signTransactions: (txns: WalletTransaction[]) => Promise<Uint8Array[]>
) {
  try {
    // Get suggested parameters
    const suggestedParams = await algodClient.getTransactionParams().do();
    
    // Encode metadata for note field
    const metadataNote = new TextEncoder().encode(
      JSON.stringify(arc69Metadata)
    );
    
    // Create ARC69 asset transaction
    const assetCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: creator,
      total: 1000, // Can be fungible or NFT (1)
      decimals: 0,
      assetName: "MyARC69Asset",
      unitName: "ARC69",
      assetURL: "https://myproject.com#arc69", // ARC69 URL format
      defaultFrozen: false,
      freeze: creator,
      manager: creator,
      reserve: creator,
      clawback: creator,
      note: metadataNote, // Metadata stored on-chain
      suggestedParams: suggestedParams,
    });

    // Sign and submit
    const signedTxns = await signTransactions([{ txn: assetCreateTxn }]);
    const { txId } = await algodClient.sendRawTransaction(signedTxns[0]).do();
    
    console.log('ARC69 asset created:', txId);
    return txId;
  } catch (error) {
    console.error('ARC69 creation failed:', error);
    throw error;
  }
}`,
    stepLineRanges: [
      { start: 1, end: 8 }, // Import and client setup
      { start: 10, end: 19 }, // Metadata structure
      { start: 25, end: 30 }, // Encode metadata
      { start: 32, end: 49 }, // Create transaction
    ],
  },

  packagesInfo: [
    {
      name: "algosdk",
      version: "2.7.0",
      description:
        "The official Algorand JavaScript SDK for creating and managing assets on the blockchain.",
      purpose:
        "Provides asset creation functions and transaction building capabilities for both ARC3 and ARC69 standards.",
      installation: "npm install algosdk",
      documentation: "https://algorand.github.io/js-algorand-sdk/",
    },
    {
      name: "ARC3 Standard",
      version: "Standard",
      description:
        "Algorand Request for Comment 3 - NFT standard with off-chain metadata stored on IPFS.",
      purpose:
        "Enables creation of NFTs with rich metadata, suitable for art, collectibles, and complex digital assets.",
      installation: "Follow ARC3 specification",
      documentation:
        "https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0003.md",
    },
    {
      name: "ARC69 Standard",
      version: "Standard",
      description:
        "Algorand Request for Comment 69 - Asset standard with on-chain metadata storage.",
      purpose:
        "Allows metadata to be stored directly on the blockchain, providing immutability and eliminating external dependencies.",
      installation: "Follow ARC69 specification",
      documentation:
        "https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0069.md",
    },
    {
      name: "IPFS",
      version: "Network Protocol",
      description:
        "InterPlanetary File System - distributed storage network used for ARC3 metadata.",
      purpose:
        "Provides decentralized storage for ARC3 metadata and assets, ensuring content addressing and immutability.",
      installation: "Use IPFS pinning services like Pinata or Infura",
      documentation: "https://ipfs.io/",
    },
  ],
};

export default useAssetCreation;
