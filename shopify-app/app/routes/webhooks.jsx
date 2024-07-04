import { authenticate } from "../shopify.server";
import db from "../db.server";
import { createWalletClient, createPublicClient, http } from 'viem'
import { Web3AffiliateContractABI } from "./Web3AffiliateContractABI";
import { baseSepolia, localhost } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { json } from "@remix-run/react";

const appWallet = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY);

console.log("wallet addr:", appWallet.address);
console.log("contract addr", process.env.CONTRACT_ADDRESS);


export const walletClient = createWalletClient({
  account: appWallet,
  // chain: localhost,
  chain: baseSepolia,
  transport: http(),
});

export const publicClient = createPublicClient({
  // chain: localhost,
  chain: baseSepolia,
  transport: http(),
})

export const action = async ({ request }) => {
  const { topic, shop, session, admin, payload } = await authenticate.webhook(request);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }



  // The topics handled here should be declared in the shopify.app.toml.
  // More info: https://shopify.dev/docs/apps/build/cli-for-apps/app-configuration
  switch (topic) {
    case "ORDERS_PAID":
      
      const cartAttrs = payload?.note_attributes.reduce((result, { name, value }) => {
        result[name] = value;
        return result;
      }, {});

      try {
        const txHash = await walletClient.writeContract({
          address: process.env.CONTRACT_ADDRESS,
          abi: Web3AffiliateContractABI,
          functionName: 'payAffiliate',
          args: [cartAttrs.walletAddress],
        });


        return json({ message: `Affiliate paid. ${txHash}` }, 200);
      } catch (err) {
        console.error("Error paying affiliate: ", err.message);
        return json({ message: "Error processing affiliate payment."}, 200);
      }
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }

      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      console.log("topic:", topic)
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
