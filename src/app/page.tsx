"use client";

import {
  useAuthModal,
  useAccount,
  useSolanaSigner,
  useSolanaTransaction,
} from "@account-kit/react";
import { useState } from "react";

export default function Home() {
  const { openAuthModal } = useAuthModal();
  const { isConnected } = useAccount();
  const signer = useSolanaSigner();
  const { sendTransaction, isPending, data } = useSolanaTransaction({});
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = () => {
    if (!toAddress || !amount) return;

    sendTransaction({
      transfer: {
        toAddress,
        amount: parseInt(amount),
      },
    });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Solana Tipper
        </h1>
        {isConnected && signer ? (
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              Your Solana address:{" "}
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                {signer.address}
              </span>
            </p>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Recipient Address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Amount (in lamports)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={isPending}
              className="w-full py-2 px-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isPending ? "Sending..." : "Send Tip"}
            </button>
            {data?.hash && (
              <a
                href={`https://explorer.solana.com/tx/${data.hash}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-blue-600 hover:underline"
              >
                View transaction
              </a>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={openAuthModal}
              className="py-2 px-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login to Get Started
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
