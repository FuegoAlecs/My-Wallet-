import {
  AlchemyAccountsUIConfig,
  cookieStorage,
  createConfig,
} from "@account-kit/react";
import { Connection } from "@solana/web3.js";
import { sepolia, alchemy } from "@account-kit/infra";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [{ type: "email" }],
      [
        { type: "passkey" },
        { type: "social", authProviderId: "google", mode: "popup" },
        { type: "social", authProviderId: "facebook", mode: "popup" },
      ],
      [
        {
          type: "external_wallets",
          walletConnect: {
            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
          },
        },
      ],
    ],
    addPasskeyOnSignup: false,
  },
};

export const config = createConfig(
  {
    transport: alchemy({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
      chain: sepolia,
    }),
    solana: {
      connection: new Connection(
        `https://solana-devnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!}`,
        {
          wsEndpoint: "wss://api.devnet.solana.com",
          commitment: "confirmed",
        }
      ),
      policyId: "<PolicyId>",
    },
    storage: cookieStorage,
    passkeyCreationOptions: "conditional",
  },
  uiConfig
);
