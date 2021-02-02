import * as React from 'react';
import { Provider } from 'react-redux';
import { Message } from './components';

import Routers from './routers';
import configureStore from './store';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Message />
      <Routers />
    </Provider>
  );
}
