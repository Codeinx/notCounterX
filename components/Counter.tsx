'use client'

import { useState, useEffect } from 'react'
import { callReadOnlyFunction, callReadOnlyFunctionOptions } from '@stacks/transactions'
import { contractCall } from '@stacks/connect'
import { useStacks } from '@/providers/StacksProvider'

interface CounterProps {
  userAddress: string
}

/**
 * Counter Component
 * 
 * Main component for interacting with the Clarity counter smart contract.
 * Features:
 * - Display current balance
 * - Increment counter
 * - Decrement counter
 * - Reset counter
 * - Real-time balance updates
 */
export default function Counter({ userAddress }: CounterProps) {
  const [balance, setBalance] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [pending, setPending] = useState<boolean>(false)
  const { userSession, network } = useStacks()

  // Get contract address from environment or use default
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
  const [contractName, contractOwner] = contractAddress.includes('.') 
    ? contractAddress.split('.') 
    : ['counter', contractAddress || 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM']

  /**
   * Fetch the current balance from the smart contract
   */
  const fetchBalance = async () => {
    try {
      setLoading(true)
      const options: callReadOnlyFunctionOptions = {
        contractAddress: contractOwner,
        contractName: contractName,
        functionName: 'get-balance',
        functionArgs: [],
        network: network,
        senderAddress: userAddress,
      }

      const response = await callReadOnlyFunction(options)
      
      if (response.okay && response.result) {
        const result = response.result as any
        if (result.value !== undefined) {
          setBalance(parseInt(result.value.toString()))
        }
      }
    } catch (error) {
      console.error('Error fetching balance:', error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle contract function calls (increment, decrement, reset)
   */
  const handleContractCall = async (functionName: string) => {
    if (!userSession) return

    try {
      setPending(true)
      
      await contractCall({
        contractAddress: contractOwner,
        contractName: contractName,
        functionName: functionName,
        functionArgs: [],
        network: network,
        userSession: userSession,
        onFinish: (data) => {
          console.log('Transaction completed:', data)
          // Refresh balance after transaction
          setTimeout(() => {
            fetchBalance()
          }, 2000)
          setPending(false)
        },
        onCancel: () => {
          setPending(false)
        },
      })
    } catch (error) {
      console.error(`Error calling ${functionName}:`, error)
      setPending(false)
    }
  }

  // Fetch balance on component mount and when user address changes
  useEffect(() => {
    if (userAddress && contractOwner) {
      fetchBalance()
    }
  }, [userAddress, contractOwner])

  // Determine balance status for visual feedback
  const getBalanceStatus = () => {
    if (balance === 0) return 'neutral'
    if (balance > 0) return 'positive'
    return 'negative'
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Balance Display Card */}
      <div className="bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl mb-8 transform transition-all duration-300 hover:scale-[1.02]">
        <div className="text-center">
          <div className="text-sm md:text-base font-semibold text-gray-300 uppercase tracking-widest mb-4">
            Current Balance
          </div>
          
          {loading ? (
            <div className="text-6xl md:text-8xl font-bold text-white animate-pulse">
              ...
            </div>
          ) : (
            <>
              <div
                className={`text-6xl md:text-8xl font-extrabold mb-4 transition-all duration-300 ${
                  getBalanceStatus() === 'positive'
                    ? 'text-green-400 drop-shadow-[0_0_30px_rgba(74,222,128,0.5)]'
                    : getBalanceStatus() === 'negative'
                    ? 'text-red-400 drop-shadow-[0_0_30px_rgba(248,113,113,0.5)]'
                    : 'text-white'
                }`}
              >
                {balance.toLocaleString()}
              </div>
              <div className="text-lg text-gray-300">
                {balance === 0 ? '⚖️ Balanced' : balance > 0 ? '📈 Positive' : '📉 Negative'}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Decrement Button */}
        <button
          onClick={() => handleContractCall('decrement')}
          disabled={pending || loading || balance === 0}
          className="group relative overflow-hidden bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-6 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 flex flex-col items-center gap-2"
        >
          <span className="text-3xl">−</span>
          <span className="text-sm uppercase tracking-wider">Decrement</span>
          {balance === 0 && (
            <span className="text-xs text-red-200 mt-1">(Min: 0)</span>
          )}
        </button>

        {/* Reset Button */}
        <button
          onClick={() => handleContractCall('reset')}
          disabled={pending || loading || balance === 0}
          className="group relative overflow-hidden bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-6 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 flex flex-col items-center gap-2"
        >
          <span className="text-3xl">↻</span>
          <span className="text-sm uppercase tracking-wider">Reset</span>
        </button>

        {/* Increment Button */}
        <button
          onClick={() => handleContractCall('increment')}
          disabled={pending || loading}
          className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-6 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 flex flex-col items-center gap-2"
        >
          <span className="text-3xl">+</span>
          <span className="text-sm uppercase tracking-wider">Increment</span>
        </button>
      </div>

      {/* Loading/Pending Indicator */}
      {pending && (
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg border border-blue-500/30">
            <div className="w-4 h-4 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">Transaction pending...</span>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={fetchBalance}
          disabled={loading || pending}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg font-medium transition-all duration-200 border border-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Refreshing...' : '🔄 Refresh Balance'}
        </button>
      </div>

      {/* Contract Info */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>Contract: {contractOwner}.{contractName}</p>
        <p className="mt-1">Network: {network.isMainnet() ? 'Mainnet' : 'Testnet'}</p>
      </div>
    </div>
  )
}
