import './App.css'
import { http, createConfig, WagmiProvider, useConnect, useAccount, useBalance, useSendTransaction } from 'wagmi'
import { base, mainnet } from 'viem/chains'
import { injected } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
  }
})
function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <EthSend />
        <MyAddress />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function MyAddress() {
  const { address, isConnected } = useAccount();
  const { data, isLoading, isError, error, status } = useBalance({
    address,
    query: {
      enabled: isConnected,
    },
  });
  console.log(data);
  
  return <div>
    {address}
    <br/>
    {data ? data.formatted.toString() : status}
  </div>
}

function WalletConnector() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ))
}

function EthSend() {

  const { data: hash, sendTransaction } = useSendTransaction();

  function sendEth() {
    sendTransaction({
      to: document.getElementById("address").value,
      value: '100000000000000000'
    })
  }
  console.log('hash', hash)
  return (
    <div>
      <input id="address" type='text' placeholder='Address..'></input>
      <button onClick={sendEth}>Send 0.1 Eth</button>
      {hash}
    </div>
  )
}

export default App;
