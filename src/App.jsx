import { useEffect, useState } from 'react'
import './App.css'
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})
function App() {

  async function getBalance() {
    const res = await client.getBalance({ address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" });
    console.log(res);
  }

  return (
    <>
      <button onClick={getBalance}>
        Get Balance
      </button>
    </>
  )
}

export default App;
