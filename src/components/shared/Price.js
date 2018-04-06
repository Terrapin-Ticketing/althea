import React from 'react';

let price = ({ price }) =>
  <span>${parseFloat(price / 100.0).toFixed(2)}</span>;

export default price;
