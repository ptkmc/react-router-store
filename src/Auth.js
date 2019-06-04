import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

export class Login extends Component {
  state = { redirectToReferrer: false };

  authenticate = () => {
    setTimeout(() => {
      this.props.setAuth(true);
      this.setState({ redirectToReferrer: true });
    }, 100); // fake async
  };

  render() {
    const { state: propState } = this.props.location;
    const redirectFrom = propState && propState.from && propState.from.pathname;
    const fromPath = redirectFrom || '/account';

    if (this.state.redirectToReferrer) return <Redirect to={fromPath} />;

    return (
      <div>
        {!this.props.isAuth && <p>You are not logged in.</p>}
        {redirectFrom && (
          <p>You must logged in to view {propState.from.pathname}</p>
        )}
        <button onClick={this.authenticate}>Log in</button>
      </div>
    );
  }
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return rest.isAuth ? (
        <Component {...props} setAuth={rest.setAuth} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

export const Account = props => (
  <h3>
    Welcome! <SignoutButton setAuth={props.setAuth} />
  </h3>
);

export const SignoutButton = withRouter(props => (
  <button
    onClick={() =>
      setTimeout(() => {
        props.setAuth(false);
        props.history.push('/');
      }, 100)
    } //fake async
  >
    Sign Out
  </button>
));
