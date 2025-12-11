'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { UserSession, AppConfig } from '@stacks/auth'
import { StacksMainnet, StacksTestnet } from '@stacks/network'

interface StacksContextType {
  userSession: UserSession | null
  isSignedIn: boolean
  userData: any
  network: StacksMainnet | StacksTestnet
}

const StacksContext = createContext<StacksContextType>({
  userSession: null,
  isSignedIn: false,
  userData: null,
  network: new StacksTestnet(),
})

export const useStacks = () => useContext(StacksContext)

interface StacksProviderProps {
  children: ReactNode
}

/**
 * StacksProvider Component
 * 
 * Manages Stacks wallet connection state using @stacks/connect directly
 * (compatible with React 18)
 */
export default function StacksProvider({ children }: StacksProviderProps) {
  const [userSession, setUserSession] = useState<UserSession | null>(null)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userData, setUserData] = useState<any>(null)

  const network = process.env.NEXT_PUBLIC_STACKS_NETWORK === 'mainnet' 
    ? new StacksMainnet() 
    : new StacksTestnet()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const appConfig = new AppConfig(['store_write'], process.env.NEXT_PUBLIC_APP_NAME || 'CounterX')
      const session = new UserSession({ appConfig })
      setUserSession(session)

      if (session.isUserSignedIn()) {
        setIsSignedIn(true)
        setUserData(session.loadUserData())
      }
    }
  }, [])

  const value = {
    userSession,
    isSignedIn,
    userData,
    network,
  }

  return (
    <StacksContext.Provider value={value}>
      {children}
    </StacksContext.Provider>
  )
}
