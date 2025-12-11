'use client'

import { useEffect, useState } from 'react'
import Counter from '@/components/Counter'
import WalletConnect from '@/components/WalletConnect'
import { useAuth } from '@stacks/connect-react'
import { StacksMainnet, StacksTestnet } from '@stacks/network'

export default function Home() {
  const { isSignedIn, userData } = useAuth()
  const [network, setNetwork] = useState<StacksMainnet | StacksTestnet>(
    new StacksTestnet()
  )

  useEffect(() => {
    // Set network based on environment variable
    const networkType = process.env.NEXT_PUBLIC_STACKS_NETWORK || 'testnet'
    setNetwork(
      networkType === 'mainnet' ? new StacksMainnet() : new StacksTestnet()
    )
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            CounterX
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light tracking-wider uppercase">
            Stacks Blockchain Counter
          </p>
        </header>

        {/* Wallet Connection */}
        <div className="mb-8">
          <WalletConnect />
        </div>

        {/* Counter Component - Only show when wallet is connected */}
        {isSignedIn && userData ? (
          <div className="animate-fade-in">
            <Counter network={network} userAddress={userData.profile?.stxAddress?.testnet || userData.profile?.stxAddress?.mainnet || ''} />
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="text-6xl mb-4">🔐</div>
              <h2 className="text-2xl font-semibold mb-2 text-gray-200">
                Connect Your Wallet
              </h2>
              <p className="text-gray-400">
                Please connect your Stacks wallet to interact with the counter
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Built with ❤️ for the Stacks Program</p>
        </footer>
      </div>
    </main>
  )
}

