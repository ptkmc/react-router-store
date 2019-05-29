import React, { Component } from 'react';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';

export const ProductView = props => {
  if (props.product) {
    return <h1>{props.product.name}</h1>;
  }
  return <h3>404 PRODUCT NOT FOUND</h3>;
};

export const CatalogView = props => {
  const productList = props.products.map(product => {
    return (
      <Link to={`${props.match.url}/${product.id}`} key={product.id}>
        <li>{product.name}</li>
      </Link>
    );
  });

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {productList}
        <Link to={`${props.match.url}/nope`}>
          <li>Not Found</li>
        </Link>
      </ul>
    </div>
  );
};
