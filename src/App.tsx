import * as React from 'react';
import { Provider } from 'react-redux';

import Routers from './routers';
import configureStore from './store';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  );
}
