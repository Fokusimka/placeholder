import React from 'react'
import { Provider } from 'react-redux';
import { Store } from './src/store/store';
import HomePage from './src/pages/homePage';

export default function App() {

  return (
    <Provider store={Store}>
      <HomePage />
    </Provider>
  );
}