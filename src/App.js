import React, { Component } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
Amplify.configure(aws_exports);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedUp : false
    }
    this.handleSignup = this.handleSignUp.bind(this);
  }

  handleSignUp() {
    this.setState({
      signedUp: true
    });
  }
  render() {
    const { signedUp } = this.state;
    return !signedUp ? <SignUpForm handleSignup={ this.handleSignUp }/> : <SignInForm />;
  }
}

export default App;