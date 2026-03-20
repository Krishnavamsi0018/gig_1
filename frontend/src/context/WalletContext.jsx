import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'

const WalletContext = createContext(null)

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    if (account) return
    setIsConnecting(true)
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setAccount(accounts[0])
        toast.success('Wallet connected!')
      } else {
        // Demo mode fallback
        await new Promise(r => setTimeout(r, 800))
        setAccount('0x742d35Cc6634C0532925a3b8D4C9D8C3')
        toast.success('Demo wallet connected!')
      }
    } catch (e) {
      toast.error('Wallet connection failed')
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAccount(null)
    toast.success('Disconnected')
  }

  return (
    <WalletContext.Provider value={{ account, connectWallet, disconnect, isConnecting }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error('useWallet must be inside WalletProvider')
  return ctx
}
