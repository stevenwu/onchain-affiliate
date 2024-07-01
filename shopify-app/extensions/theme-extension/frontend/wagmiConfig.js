import { createConfig, http } from 'wagmi';
// import { base, baseSepolia } from 'wagmi/chains';
import { base, baseSepolia, localhost } from 'wagmi/chains';
import { coinbaseWallet, injected, metaMask, safe, walletConnect } from 'wagmi/connectors'


export function createWagmiConfig(rpcUrl, projectId) {
  // Keep this till we fully deprecated RK inside the template
  if (projectId) {
    console.log('projectId:', projectId);
  }

  // Temporary hack, until we configure a FE page in OnchainKit to copy just the API key
  const baseUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base/');
  const baseSepoliaUrl = rpcUrl.replace(/\/v1\/(.+?)\//, '/v1/base-sepolia/');
  const localhostUrl = 'http://127.0.0.1:8545'

  return createConfig({
    chains: [localhost,base,baseSepolia],
    connectors: [
      injected(),
      coinbaseWallet({
        appName: 'buildonchainapps',
        preference: 'smartWalletOnly',
      }),
    ],
    ssr: true,
    transports: {
      [localhost.id]: http(localhostUrl),
      [base.id]: http(baseUrl),
      [baseSepolia.id]: http(baseSepoliaUrl)
    },
  });
}
// export const wagmiConfig = createWagmiConfig('http://127.0.0.1:8545');
export const wagmiConfig = createWagmiConfig('/api/rpc');
