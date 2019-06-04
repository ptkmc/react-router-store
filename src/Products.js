import React from 'react';
import { Link } from 'react-router-dom';
import { SignoutButton } from './Auth';

export const Product = props => {
  if (props.product) {
    const propState = props.location.state;
    const fromPath = (propState && propState.from) || '';

    return (
      <div>
        <h3>{props.product.name}</h3>
        {fromPath && <Link to={propState.from}>&lt; Back</Link>}
      </div>
    );
  }
  return <h3>404 PRODUCT NOT FOUND</h3>;
};

export const Catalog = props => {
  const productList = props.products.map(product => {
    return (
      <li key={product.id}>
        <Link
          to={{
            pathname: `${props.match.url}/${product.id}`,
            state: { from: props.location.pathname }
          }}
        >
          {product.name}
        </Link>
      </li>
    );
  });

  return (
    <div>
      <h3>Products</h3>
      <ul>
        {productList}
        <li>
          <Link to={`${props.match.url}/nope`}>Product Not Found</Link>
        </li>
      </ul>
    </div>
  );
};

export const Cart = props => (
  <h3>
    My Cart <SignoutButton setAuth={props.setAuth} />
  </h3>
);
