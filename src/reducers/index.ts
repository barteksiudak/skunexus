import { combineReducers } from 'redux';
import planets from './planets';

export default function reducers() {
  return combineReducers({
    planets,
  });
}
