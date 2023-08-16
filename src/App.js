import React, { useState } from 'react';
import './App.css';

function App() {
  const [address, setAddress] = useState('');
  const [eligibility, setEligibility] = useState(null);
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const apiUrl = 'https://incentivized-testnet.seinetwork.io/check-eligibility';

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const checkEligibility = () => {
    fetch(`${apiUrl}?seiAddress=${address}`)
      .then(response => response.json())
      .then(data => {
        console.log('Data yang diterima:', data);
        setEligibility(data.eligible);
        setReason(data.reason);
  
        // Extract the numeric part from the string and convert it to a number
        const amountStr = data.eligibleAmount;
        const numericAmount = parseFloat(amountStr.replace(/[^\d]/g, ''), 10);
        console.log(numericAmount)
        setAmount(numericAmount / 1000000);
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };

  return (
    <div className="container">
      <h1>Check Eligibility SEI</h1>
      <p>Enter your address below to check eligibility:</p>
      <input
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={handleAddressChange}
      />
      <button onClick={checkEligibility}>Check Eligibility</button>

      {eligibility !== null && (
        <div className="result">
          <h2>Eligibility Result</h2>
          <p>Address: {address}</p>
          <p>Eligibility: {eligibility ? 'Eligible' : <img src='https://cdn.discordapp.com/attachments/839452055357489176/1141253801337163816/ExEQGZCVIAIDjtU.png' />} </p>
          <p>Reason: {reason}</p>
          <p>Amount: {amount} SEI</p>

        </div>
      )}

    <p>Created By: <a href='https://twitter.com/StressCapitalsi'>Stress Capital</a></p>
      <img src='https://cdn.discordapp.com/attachments/839452055357489176/1141252974623084604/fqc-vkue_400x400.png' ></img>
    </div>
  );
}

export default App;
