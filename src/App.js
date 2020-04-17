import React, { Component } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);


class App extends Component {

  render() {
    if (this.props.authState === "signedIn") {
      return (
          <div>
            <h1>Internal App</h1>
          </div>
      );
    } else {
      return null;
    }
  }
}

export default App;