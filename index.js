const express = require('express');
const { Connection, PublicKey } = require('@solana/web3.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Verbindung zur Solana Blockchain
const connection = new Connection('https://api.mainnet-beta.solana.com');
const myWallet = new PublicKey('DEINE_WALLET_ADRESSE_HIER');

// Einfache Startseite, damit der Server nicht "tot" wirkt
app.get('/', (req, res) => {
  res.send('Crypto Backend läuft und lauscht!');
});

// Hier prüft der Server, ob sich der Kontostand ändert
async function checkWallet() {
  try {
    const balance = await connection.getBalance(myWallet);
    console.log(`Aktueller Wallet-Stand (Lamports): ${balance}`);
  } catch (error) {
    console.error("Fehler beim Abrufen der Wallet:", error);
  }
}

// Alle 30 Sekunden die Wallet prüfen
setInterval(checkWallet, 30000);

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
