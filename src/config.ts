import { createConfig, cookieStorage } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { arbitrumSepolia, alchemy } from "@account-kit/infra";

export const config = createConfig(
  {
    transport: alchemy({
      // Replace with your API key
      apiKey: "YOUR_API_KEY",
    }),
    chain: arbitrumSepolia,
    ssr: true,
    storage: cookieStorage,
    enablePopupOauth: true,
    // For gas sponsorship (optional)
    // Learn more here: https://www.alchemy.com/docs/wallets/react/sponsor-gas
    policyId: "YOUR_POLICY_ID",
  },
  {
    auth: {
      sections: [
        [{ type: "email" }],
        [{ type: "passkey" }, { type: "social", authProviderId: "google", mode: "popup" }],
      ],
      addPasskeyOnSignup: true,
    },
  },
);

export const queryClient = new QueryClient();
