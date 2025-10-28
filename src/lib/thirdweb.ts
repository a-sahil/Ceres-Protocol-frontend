import { createThirdwebClient, defineChain } from "thirdweb";

// 1. Get your client ID from the environment variables
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error("VITE_THIRDWEB_CLIENT_ID is not set in your .env file");
}

// 2. Define the Hedera Testnet configuration using the details you provided
export const hederaTestnet = defineChain({
  id: 296, // 0x128 in decimal
  name: "Hedera Testnet",
  rpc: "https://testnet.hashio.io/api",
  nativeCurrency: {
    name: "HBAR",
    symbol: "HBAR",
    decimals: 8,
  },
  testnet: true,
});

// 3. Create and export the Thirdweb client
export const client = createThirdwebClient({
  clientId,
});