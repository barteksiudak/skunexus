import { combineReducers } from 'redux';
import planets from './planets';
import message from './message';

export default function reducers() {
  return combineReducers({
    planets,
    message,
  });
}
