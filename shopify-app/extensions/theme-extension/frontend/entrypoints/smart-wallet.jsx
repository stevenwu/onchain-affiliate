import 'vite/modulepreload-polyfill'
import register from 'preact-custom-element'
import Button from '@/components/Button.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Buffer } from 'buffer'
import { WagmiProvider } from 'wagmi'

import { wagmiConfig } from '../wagmiConfig'

globalThis.Buffer = Buffer

const queryClient = new QueryClient()

const SmartWallet = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Button />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

register(SmartWallet, 'smart-wallet', ['start'], { shadow: false })
