'use client'

import { useAuth, useConnect } from '@stacks/connect-react'
import { showConnect } from '@stacks/connect'
import { StacksMainnet, StacksTestnet } from '@stacks/network'

interface WalletConnectProps {}

/**
 * WalletConnect Component
 * 
 * Handles Stacks wallet connection and disconnection.
 * Provides a beautiful UI for connecting/disconnecting the wallet.
 */
export default function WalletConnect({}: WalletConnectProps) {
  const { isSignedIn, userData, signOut } = useAuth()
  const { doOpenAuth } = useConnect()

  const network = process.env.NEXT_PUBLIC_STACKS_NETWORK === 'mainnet' 
    ? new StacksMainnet() 
    : new StacksTestnet()

  const handleConnect = () => {
    showConnect({
      appDetails: {
        name: process.env.NEXT_PUBLIC_APP_NAME || 'CounterX',
        icon: window.location.origin + '/icon.png',
      },
      redirectTo: '/',
      onFinish: () => {
        window.location.reload()
      },
      userSession: undefined,
    })
  }

  const handleDisconnect = async () => {
    await signOut()
    window.location.reload()
  }

  const address = userData?.profile?.stxAddress?.testnet || 
                  userData?.profile?.stxAddress?.mainnet || 
                  ''

  return (
    <div className="flex justify-center">
      {isSignedIn && userData ? (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/20 w-full max-w-md">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">
                Connected Wallet
              </div>
              <div className="text-sm font-mono text-white truncate">
                {address}
              </div>
            </div>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg font-medium transition-all duration-200 border border-red-500/30 hover:border-red-500/50"
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <span>🔗</span>
          <span>Connect Stacks Wallet</span>
        </button>
      )}
    </div>
  )
}

