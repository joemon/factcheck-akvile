import React, { Component } from 'react';
import 'whatwg-fetch';
import { Button, Modal, Input, Row, Col, Card } from 'react-materialize';

//Used https://medium.com/@Keithweaver_/building-a-log-in-system-for-a-mern-stack-39411e9513bd


import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('factcheck_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {
    // get state
    const {
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        console.log(signUpEmail)
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    // get state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('factcheck_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('factcheck_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <Modal trigger={<Button>Sign In/Sign Up</Button>}>
        <div className="teal lighten-2">
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
          
          <h3> Welcome to our fact check! </h3>
          <h5> If you're using our website for the first time, please scroll down to sign up</h5>
           
            <Col m={6} s={12}>
              <Card className='blue lighten-4' textClassName='black-text' title='Sign In'>
                     <p>Email</p>
                     <input
                        type="email"
                        value={signInEmail}
                        onChange={this.onTextboxChangeSignInEmail}
                      />

                      <br />
                      <p>Password</p>
                      <input
                        type="password"
                        value={signInPassword}
                        onChange={this.onTextboxChangeSignInPassword}
                      />
                      <br />
            <Button waves='light' onClick={this.onSignIn} type='submit' target='_blank'> Sign In </Button>

              </Card>
            </Col>
           
           
          </div>
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }

           
            <Col m={6} s={12}>
              <Card className='blue lighten-4' textClassName='black-text' title='Sign Up'>
                    <p>Email</p>
            <input
              type="email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            />
            <br />
            <p>Password</p>
            <input
              type="password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            />
            
            <Button waves='light' onClick={this.onSignUp} type='submit' target='_blank'> Sign Up </Button>

              </Card>
            </Col>
           
          </div>

        </div>
        </Modal>
      );
    }

    return (
      <div>

        <p>You're signed in <Button onClick={this.logout}>Logout</Button></p>
      
      </div>
    );
  }
}

export default User;