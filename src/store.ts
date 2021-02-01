import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import createReducers from './reducers';

export default function store() {
  return createStore(createReducers(), compose(applyMiddleware(thunk)));
}
