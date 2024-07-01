'use client';
import { useWeb3AffiliateContract } from 'app/_contracts/useWeb3AffiliateContract';
import { Abi, Address } from 'viem';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import Footer from '@/components/layout/footer/Footer';
import AccountConnect from '@/components/layout/header/AccountConnect';
import Header from '@/components/layout/header/Header';
import React from 'react';

export const ca = '0xf21b57Ad2041534Fa947cDE49C89C7C974f03058';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
  const account = useAccount();
  const { data: hash, isPending, writeContract, status, error } = useWriteContract();
  const w3a = useWeb3AffiliateContract();

  let abi = w3a.abi;

  let affiliateAddress = '0x2981cA79b738A657761e0D200Bb190DAE993d184';


    const { isError: readError, data: readData, status: readStatus, error: readErrorMsg } = useReadContract({
      abi,
      address: ca,
      functionName: 'getReferrals',
      args: [account.address]
    })

  


  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);


    let date = Math.floor(new Date().getTime() / 1000);
    let source = 'http://localhost:3000';

    writeContract({
        abi,
        address: ca,
        functionName: 'createReferral',
        args: [affiliateAddress, account.address, date, source]
      });
  }


  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col px-8 py-16">
        <div>
          <h1 className="text-center text-4xl">Automatically apply discounts for customer referrals.</h1>
          <h2 className="text-xl text-center mt-3">Pay out your affiliates automatically</h2>
          <br />
          <h3 className="text-lg">Account</h3>
          <ul>
            <li>
              <b>status</b>: {account.status}
            </li>
            <li>
              <b>addresses</b>: {JSON.stringify(account.addresses)}
            </li>
            <li>
              <b>chainId</b>: {account.chainId}
            </li>
            <li>
              <div>Wagmi Status: {status}</div>
              <div>Error: {error?.message}</div>
              <div>{error?.name} {JSON.stringify(error?.cause)}</div>
            </li>
          </ul>

          <div className="mt-8 flex max-w-fit items-center space-x-6 bg-blue-500 p-5 text-white">
            <h2>Sign up for this offer and get $10 off your next order at OA Snowboards</h2>
            {account.isDisconnected ? (
              <div className="bg-boat-color-blue-50 text-white">
                <AccountConnect />
              </div>
            ) : (
              <form className="flex flex-col space-y-3" onSubmit={submit}>
                <input
                  name="affiliateAddress"
                  placeholder="0x0"
                  readOnly
                  hidden
                  value={affiliateAddress}
                />
                <input
                  name="customerAddress"
                  placeholder="0x0"
                  readOnly
                  hidden
                  value={account.address}
                />
                <button
                  type="submit"
                  className="rounded-full bg-white px-3 text-boat-color-blue-40 text-sm py-3"
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  disabled={readData?.signupDate}
                >
                  {readData?.signupDate ? "You're on the list!" : 'Claim offer'}
                </button>
                <a
                  href="https://onchain-affiliate.myshopify.com"
                  className="rounded-full bg-white px-3 text-boat-color-blue-40 text-center no-underline p-3 text-sm"
                  target="_blank"
                >
                  Shop now
                </a>
              </form>
            )}
          </div>

          <div>
            <h1>My Referrals</h1>
            {JSON.stringify(readData)}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
