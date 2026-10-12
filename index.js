const express = require('express');
const { ethers } = require('ethers');

const app = express();
const PORT = process.env.PORT || 3000;

// Verbindung zu einem öffentlichen Ethereum/Polygon/BSC RPC (hier am Beispiel Polygon / EVM)
const provider = new ethers.JsonRpcProvider('https://polygon-rpc.com'); 

// Deine Vision-Wallet-Adresse aus dem Screenshot
const myWalletAddress = '0x1FCcc1959B2d457a864d3c112fb8414511755CBD';

app.get('/', (req, res) => {
  res.send('Vision Wallet Backend läuft und überwacht die Adresse!');
});

async function checkWallet() {
  try {
    const balance = await provider.getBalance(myWalletAddress);
    console.log(`Aktueller Kontostand: ${ethers.formatEther(balance)} ETH/POL`);
  } catch (error) {
    console.error("Fehler beim Abrufen des Kontostands:", error);
  }
}

// Alle 30 Sekunden prüfen
setInterval(checkWallet, 30000);

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
