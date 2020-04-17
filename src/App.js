import React, { Component } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from "aws-amplify-react";

Amplify.configure(aws_exports);

class App extends Component {

  render() {

    return(

        <div>
          <h1>Test</h1>
        </div>

    );
  }
}

export default withAuthenticator(App, true);