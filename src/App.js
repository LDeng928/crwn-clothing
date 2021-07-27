import React from 'react';
import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom'; 

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  // To open/close subscription 
  unsubscribeFromAuth = null;

  // OPEN SUBSCRIPTION - Google sign in - Subscribe. It will keep the user section
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // Store the user in our app.
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // Redux setCurrentUser
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
        
      } else {
        setCurrentUser( userAuth ); 
      }                 
    })
  }

  // Close subscription now to prevent memory leaks
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} /> 
        <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUp />
              )
            }
          />     
      </Switch>     
    </div>
    )  
  };
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
