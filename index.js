const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");

const newKP = new Keypair()

const publicKey = new PublicKey(newKP._keypair.publicKey).toString();
console.log(publicKey)
const secretKey = newKP._keypair.secretKey


// get wallet balance

const getBalance = async()=>{
    try{
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        );
        console.log(`=> For wallet address ${publicKey}`);
        console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
    }catch(err){
        console.log(err)
    }
}

// airdropping function
const airDropSol = async()=>{
    try{const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = Keypair.fromSecretKey(secretKey);
        console.log(`-- Airdropping 2 SOL --`)
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    }catch(err){
        console.log(err);
    }
}

//driver
const driver = async()=>{
    await getBalance()
    await airDropSol()
    await getBalance()
}

driver()