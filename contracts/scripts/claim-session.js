const {TransactionBlock}  = require("@mysten/sui.js/transactions");
const {Ed25519Keypair} = require("@mysten/sui.js/keypairs/ed25519");
const { getFullnodeUrl, SuiClient } = require('@mysten/sui.js/client');
const dotenv = require('dotenv');
dotenv.config();

if (!process.env.PACKAGE_ID) {
    console.log('Requires PACKAGE_ID; set with `export PACKAGE_ID="..."`');
    process.exit(1);
  }

async function claim() {
    const keypair = Ed25519Keypair.deriveKeypair(process.env.MNEMONIC_USER);
    const client = new SuiClient({
        url: getFullnodeUrl(process.env.NETWORK),
    });
    const tx = new TransactionBlock();
    let packageId = process.env.PACKAGE_ID;
    let collectionId = process.env.EVENT_OBJECT_ID;

    // claim ticket by user
    tx.moveCall({
        target: `${packageId}::ticket_collection::claim_session`,
        arguments: [
            tx.object(collectionId),
            // session collection id 
            tx.object(process.env.SESSION_COLLECTION_ID),
            // session object id 
            tx.pure("0xee12f30884eda3ed5f14796afb4b66f0998b07b0096b928233290a807fb3287c")
        ],
        typeArguments: [`${packageId}::ticket_collection::NFTSession`]
    });
    const result = await client.signAndExecuteTransactionBlock({
        signer: keypair,
        transactionBlock: tx,
    });


    console.log({ result });
}

claim();
