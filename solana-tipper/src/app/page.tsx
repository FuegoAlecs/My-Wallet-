"use client";

import { useAuthModal, useAccount, useSolanaSigner, useSolanaTransaction } from "@account-kit/react";
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
    <main className="container">
      <h1 className="text-4xl font-bold mb-8 text-center">Solana Tipper</h1>
      {isConnected && signer ? (
        <div className="flex flex-col gap-4 bg-gray-100 p-8 rounded-lg">
          <p className="text-xl font-semibold">Welcome!</p>
          <p>Your Solana address is: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{signer.address}</span></p>
          <input
            type="text"
            placeholder="Recipient Address"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Amount (in lamports)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={handleSend}
            disabled={isPending}
            className="rounded-full bg-blue-500 px-8 py-3 text-white disabled:bg-gray-400 hover:bg-blue-600 transition-colors"
          >
            {isPending ? "Sending..." : "Send Tip"}
          </button>
          {data?.hash && (
            <a
              href={`https://explorer.solana.com/tx/${data.hash}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-center"
            >
              View transaction
            </a>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
            <button
            onClick={openAuthModal}
            className="rounded-full bg-blue-500 px-8 py-3 text-white hover:bg-blue-600 transition-colors"
            >
            Login
            </button>
        </div>
      )}
    </main>
  );
}
