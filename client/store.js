import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { loadActionCreator } from './actions/actions';


// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

// load the restaurant cards from the backend here
store.dispatch(loadActionCreator());

export default store;