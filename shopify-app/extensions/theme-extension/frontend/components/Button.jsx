import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useEffect } from 'preact/hooks'

export default function Button(props) {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    (async () => {
      if (!account.address) return;
      let formData = new FormData();
      formData.append("attributes[walletAddress]", account.address);
      let res = await fetch(window.Shopify.routes.root + 'cart/update.js', {
        method: 'POST',
        body: formData
      });
      let json = await res.json();
      console.log("added attributes", json);
      let _hasDiscount = await fetch('http://localhost:3000/api/discounts', {
        method: 'POST',
        body: JSON.stringify({ walletAddress: account.address })
      });
      let hasDiscount  = await _hasDiscount.json()

      let res3 = await fetch(window.Shopify.routes.root + 'cart/update.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ attributes: hasDiscount?.data })
      })
      let json3 = await res3.json();
      console.log("json3", json3);
    })()
  }, [account.address])

  return (
    <div style="color: black">
      <p>status: {account.status}</p>
      <p>address1: {account.address}</p>
      <div>
      {account.status === 'connected' && (
        <button type="button" onClick={() => disconnect()}>
          Disconnect
        </button>
      )}
      </div>
      <div style="display: flex">
      {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
            style="padding-left: 12px;"
          >
            {connector.name}
          </button>
        ))}
      </div>
    </div>
  )
}
