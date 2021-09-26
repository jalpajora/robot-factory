import { combineReducers } from 'redux';
import robotsReducer, { initialRobotsState } from './robotsReducer';

const reducers = combineReducers({
  robots: robotsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

export { initialRobotsState };
