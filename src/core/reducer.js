import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import app from '../AppState';
import main from './main';
const appReducer = combineReducers({
  // ## Generator Reducers
  [main.constants.NAME]: main.reducer,
  app,
});

const rootReducer = (state, action) => {
  // if (action.type === auth.actions.LOGOUT.DO) {
  //   AsyncStorage.removeItem('persist:root');
  //   BackgroundTimer.stopBackgroundTimer();
  //   state = undefined;
  // }
  return appReducer(state, action);
};

export default rootReducer;
