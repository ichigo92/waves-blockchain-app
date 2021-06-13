import React, { useState } from 'react';
import './App.css';


import { Signer } from "@waves/signer";
import { ProviderWeb } from '@waves.exchange/provider-web';
import { ProviderCloud } from '@waves.exchange/provider-cloud';

const signer = new Signer({NODE_URL: 'https://nodes-testnet.wavesnodes.com'});
const providerWeb = new ProviderWeb('https://testnet.waves.exchange/signer/');
const providerCloud = new ProviderCloud();



function WavesSigner() {

  const [user, setUser] = useState(null);
  const [balances, setBalances] = useState(null);
  
  const auth = async () => {
    signer.setProvider(providerWeb);
    login();
  }

  const emailAuth = () => {
    signer.setProvider(providerCloud);
    login();
  };

  const login = async () => {
    
    try {

      const user = await signer.login();
      console.log('user', user);
      setUser(user);
      getBalance();

    } catch(error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signer.logout();
      setUser(null);
      setBalances(null);
    }catch (error) {
      console.error(error);
    }
  }

  const getBalance = async () => {
    const balances = await signer.getBalance();
    console.log('balances', balances);
    setBalances(balances);
  }

  const invokeFaucetTopUp = async () => {
    const resp = await signer.invoke({
       dApp: "3MuN7D8r19zdvSpAd1L91Gs88bcgwUFy2mn",
        call: {
            function: "faucet"
        }
    }).broadcast();
    console.log('top up', resp);
  }

  const sendDataTransaction = async () => {
    const date = new Date();
    const resp = await signer.data({
      data: [
        {
          key: "lastCall",
          value: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          type: 'string'
        }
      ]
    }).broadcast();
    console.log('data', resp);
  }

  const transferAmount = async () => {
    const resp = await signer
      .transfer({amount: 100000000, recipient: 'alias:T:merry'}) // Transfer 1 WAVES to alias merry
      .broadcast(); // Promise will resolved after user sign and node response
    console.log('transfer amount', resp);
  }

  return (
    <div className="App">
      <header>
        <div className="container">
          {!user ? <><input className="btn btn-primary" type="submit" value="Waves Signer" onClick={() => auth()} />
          <input className="btn btn-primary" type="submit" value="Waves Email" onClick={() => emailAuth()} /></>
          : <input className="btn btn-primary" type="submit" value="Logout" onClick={() => logout()} />}
          
          {user ? <p>{user.address}</p> : <p>User not Logged In!</p>}
          {balances && <p>{JSON.stringify(balances[0])}</p>}
          {/*user && <input className="btn btn-primary" type="submit" value="Top Up" onClick={() => invokeFaucetTopUp()} />*/}
          {user && <input className="btn btn-primary" type="submit" value="Send Data Transaction" onClick={() => sendDataTransaction()} />}
          {user && <input className="btn btn-primary" type="submit" value="Transfer Amount" onClick={() => transferAmount()} />}
        </div>
      </header>
    </div>
  );
}

export default WavesSigner;
