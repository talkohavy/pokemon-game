// Step 1: import redux's combineReducers
import { combineReducers } from 'redux';

// Step 2: import all reducers
import gameReducer from './game/reducer';
import modalsReducer from './modals/reducer';

// Step 3: Combine all reducers + decide on NAMES, to create your rootReducer.
// Plus, add routerReducer of redux-first-history
const rootReducer = combineReducers({
  game: gameReducer,
  modals: modalsReducer,
});

// Step 4: export it as default
export default rootReducer;
