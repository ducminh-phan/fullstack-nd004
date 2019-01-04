import React, { Component } from 'react';
import Login from './components/login/Login';
import GLogin from './components/login/GoogleLogin';
import Auth from './utils/auth';
import Storage from './utils/storage';

class App extends Component {
  logout = () => {
    Storage.clear();
    this.forceUpdate();
  };

  render() {
    const content = Auth.isAuthenticated()
      ? (
        <div>
          <p>Authenticated</p>
          <div>
            {Storage.getUser().username}
          </div>
          <div>
            <button type="button" onClick={this.logout} className="button">
              Log out
            </button>
          </div>
        </div>
      )
      : (
        <div>
          <Login />
          <GLogin />
        </div>
      );

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
