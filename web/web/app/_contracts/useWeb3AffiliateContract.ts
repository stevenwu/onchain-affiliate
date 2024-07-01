import { Abi } from 'abitype';
import { base, baseSepolia, localhost } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import { Web3AffiliateContractABI } from './Web3AffiliateContractABI';

/**
 * Returns contract data for the BuyMeACoffee contract.
 */

export const useWeb3AffiliateContract = generateContractHook({
  abi: Web3AffiliateContractABI as Abi,
  1337: {
    chain: localhost,
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  },
  [base.id]: {
    chain: base,
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  },
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  },
  // ... more chains for this contract go here
});
