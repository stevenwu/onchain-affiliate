import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem'
import { localhost } from 'viem/chains'
import { Web3AffiliateContractABI } from 'app/_contracts/Web3AffiliateContractABI';

export const publicClient = createPublicClient({
  chain: localhost,
  transport: http(),
})

export async function POST(req: Request): Promise<NextResponse> {
  const data = await req.json()

  // const hasReferral = await publicClient.readContract({
  //   address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  //   abi: Web3AffiliateContractABI,
  //   functionName: 'payAffiliate',
  //   args: [data.walletAddress],
  // })

  return NextResponse.json({ message: JSON.stringify({ foo: 'bar' }), data: JSON.stringify({}) }, { status: 200, headers: {
    'Access-Control-Allow-Origin': '*'
  } });
}
