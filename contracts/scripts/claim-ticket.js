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
        target: `${packageId}::ticket_collection::claim_ticket`,
        arguments: [
            tx.object(collectionId),
            tx.pure("0xa5d58fe7a90d5e9693fd614166fe9b944b43daf0acc95fdd7c374a94f5c110a3")
        ],
        typeArguments: [`${packageId}::ticket_collection::NFTTicket`]
    });
    const result = await client.signAndExecuteTransactionBlock({
        signer: keypair,
        transactionBlock: tx,
    });


    

    console.log({ result });
}

claim();
