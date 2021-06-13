import logo from './logo.svg';
import './App.css';

import WavesSigner from './WavesSigner';


function App() {
  const auth = () => {
    const authData = { data: 'Auth on my site' };
    /*global WavesKeeper*/
    /*eslint no-undef: "error"*/
    if(WavesKeeper) {
      WavesKeeper.auth(authData)
        .then(auth => {
          console.log(auth);
        })
        .catch(error => console.error(error));
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className="container">
          <input className="btn btn-primary" type="submit" value="Auth" onClick={() => auth()}/>
        </div>
        <WavesSigner />
      </header>
    </div>
  );
}

export default App;
