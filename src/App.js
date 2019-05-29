import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { CatalogView, ProductView } from './Products';

const Home = props => <h1>Home</h1>;
const About = props => <h1>About</h1>;

class App extends Component {
  state = {
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

  getProduct(productId) {
    return this.state.products.find(product => product.id === productId);
  }

  render() {
    return (
      <Router>
        <nav>
          <Link to="/">Home</Link> <Link to="/about">About</Link>{' '}
          <Link to="/products">Products</Link> <Link to="/nope">404</Link>
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route
            path="/products/:productId"
            render={props => (
              <ProductView
                {...props}
                product={this.getProduct(props.match.params.productId)}
              />
            )}
          />
          <Route
            path="/products"
            render={props => (
              <CatalogView {...props} products={this.state.products} />
            )}
          />
          <Route render={() => <h3>404 NOT FOUND</h3>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
