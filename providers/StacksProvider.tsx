'use client'

import { Connect } from '@stacks/connect-react'
import { StacksMainnet, StacksTestnet } from '@stacks/network'
import { AuthOptions } from '@stacks/connect'

interface StacksProviderProps {
  children: React.ReactNode
}

/**
 * StacksProvider Component
 * 
 * Wraps the application with Stacks Connect provider
 * to enable wallet connection and contract interactions.
 */
export default function StacksProvider({ children }: StacksProviderProps) {
  const network = process.env.NEXT_PUBLIC_STACKS_NETWORK === 'mainnet' 
    ? new StacksMainnet() 
    : new StacksTestnet()

  const authOptions: AuthOptions = {
    appDetails: {
      name: process.env.NEXT_PUBLIC_APP_NAME || 'CounterX',
      icon: typeof window !== 'undefined' ? window.location.origin + '/icon.png' : '',
    },
    redirectTo: '/',
    network: network,
  }

  return (
    <Connect authOptions={authOptions}>
      {children}
    </Connect>
  )
}

