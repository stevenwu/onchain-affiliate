import {shopifyApi, LATEST_API_VERSION, GraphqlQueryError} from '@shopify/shopify-api';
import { Web3AffiliateContractABI } from 'app/_contracts/Web3AffiliateContractABI';
import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem'
import { baseSepolia, localhost } from 'viem/chains'
import '@shopify/shopify-api/adapters/node';

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
})

const shopify = shopifyApi({
  apiSecretKey: process.env.SHOP_APP_API_SECRET || "",            // Note: this is the API Secret Key, NOT the API access token
  apiVersion: LATEST_API_VERSION,
  isCustomStoreApp: true,                        // this MUST be set to true (default is false)
  adminApiAccessToken: process.env.SHOP_ADMIN_API_TOKEN, // Note: this is the API access token, NOT the API Secret Key
  isEmbeddedApp: false,
  hostName: "onchain-affiliate.myshopify.com",
  // Mount REST resources.
});



const session = shopify.session.customAppSession("onchain-affiliate.myshopify.com");

export async function POST(req: Request): Promise<NextResponse> {
  const data = await req.json()

  const hasReferral = await publicClient.readContract({
    address: '0xfa44D585f6028815060E900947eC71e50A7e0Ea8',
    abi: Web3AffiliateContractABI,
    functionName: 'hasReferral',
    args: [data.walletAddress],
  })

  let gqlClient = new shopify.clients.Graphql({
    session,
    apiVersion: LATEST_API_VERSION
  })

  if (hasReferral) {
    let createReferralMetaobject = await gqlClient.request(
      `
      mutation {
      metaobjectUpsert(
        handle: {type: "onchain_accounts", handle: "${data.walletAddress}"}
        metaobject: {handle: "${data.walletAddress}", fields: [{key: "address", value: "${data.walletAddress}"}, {key: "has_referral", value: "${hasReferral}"}]}
        ) {
          metaobject {
            handle
            field(key: "address") {
              value
            }
          }
          userErrors {
            field
            message
            code
          }
        }
      }
      `
    )
    console.log({createReferralMetaobject});
  }

  try {
    let gqlResponse = await gqlClient.request(
      `{
          metaobjects(type: "onchain_accounts", first: 250) {
            edges {
              node {
                address: field(key: "address") {
                  value
                }
                has_referral: field(key: "has_referral") {
                  value
                }
              }
            }
          }
      }`,
    );


    let referrals = gqlResponse?.data?.metaobjects?.edges?.reduce((result: { [x: string]: boolean; }, { node }: any) => {
      result[node.address?.value] = Boolean(node.has_referral?.value || false);
      return result;
    }, {})

    console.log("referrals", referrals)


    console.log(JSON.stringify(gqlResponse));
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      console.log("gql errors: ", error.body?.errors.graphQLErrors);
    }
  }

  // if has_referral is true in the contract, set it to true in the metaobject
  // otherwise skip and return false

  // if has_referral, add attribute to cart?
  // check metaobjects during checkout for value and apply discount
  // add attribute to cart to tag affiliate

  return NextResponse.json({ message: JSON.stringify(hasReferral), data: { hasReferral } }, { status: 200, headers: {
    'Access-Control-Allow-Origin': '*'
  } });
}
