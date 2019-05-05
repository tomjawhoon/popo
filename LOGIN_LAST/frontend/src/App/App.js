import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import Login from '../Login';
import logo from './logo.png';
import Profile from '../Profile/Profile';
import TEST from './TEST';
import './App.css';
import { Button } from 'reactstrap';

const LS_KEY = 'mm-login-demo:auth';

class App extends Component {
  componentWillMount() {
    // Access token is stored in localstorage
    const auth = JSON.parse(localStorage.getItem(LS_KEY));
    this.setState({
      auth
    });
  }

  handleLoggedIn = auth => {
    localStorage.setItem(LS_KEY, JSON.stringify(auth));
    this.setState({ auth });
  };

  handleLoggedOut = () => {
    localStorage.removeItem(LS_KEY);
    this.setState({ auth: undefined });
  };

  render() { // รูปภาพอยู่ในนี้
    const { auth } = this.state;
    return (
    
      <div className="App">
        <TEST />
        <header className="App-header"> 
          <img src={logo} className="App-logo" alt="logo" /> 
          <h1>PSU COIN</h1>
          <h1 className="App-title"></h1>
        </header>
        <div className="App-intro">
          {auth ? (
            <Profile auth={auth} onLoggedOut={this.handleLoggedOut} />
          ) : (
            <Login onLoggedIn={this.handleLoggedIn} />
          )}
        </div>
        <Alert color="dark"><a href="#" class="col-sm-6"></a>Naratorn Boonpeam COE#15</Alert>
      </div>
  
    );
  }
}

export default App;
