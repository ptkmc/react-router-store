import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Catalog, Product, Cart } from './Products';
import { Login, PrivateRoute, Account } from './Auth';

const Home = props => <h3>Home</h3>;
const About = props => <h3>About</h3>;

class App extends Component {
  state = {
    isAuthenticated: false,
    products: [
      {
        id: 'product-1',
        name: 'Product 1'
      },
      {
        id: 'product-2',
        name: 'Product 2'
      }
    ]
  };

  getProduct = productId =>
    this.state.products.find(product => product.id === productId);

  setAuthentication = isAuth => {
    this.setState({ isAuthenticated: isAuth });
  };

  render() {
    return (
      <Router>
        <nav>
          <Link to="/">Home</Link> <Link to="/about">About</Link>{' '}
          <Link to="/products">Products</Link> <Link to="/cart">Cart</Link>{' '}
          {this.state.isAuthenticated ? (
            <Link to="/account">Account</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route
            path="/products/:productId"
            render={props => (
              <Product
                {...props}
                product={this.getProduct(props.match.params.productId)}
              />
            )}
          />
          <Route
            path="/products"
            render={props => (
              <Catalog {...props} products={this.state.products} />
            )}
          />
          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                setAuth={this.setAuthentication}
                isAuth={this.state.isAuthenticated}
              />
            )}
          />
          <PrivateRoute
            path="/cart"
            component={Cart}
            isAuth={this.state.isAuthenticated}
            setAuth={this.setAuthentication}
          />
          <PrivateRoute
            path="/account"
            component={Account}
            setAuth={this.setAuthentication}
            isAuth={this.state.isAuthenticated}
          />
          <Route render={() => <h3>404 NOT FOUND</h3>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
