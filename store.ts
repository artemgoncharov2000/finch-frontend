import {createStore, combineReducers} from 'redux';
import guideReducer from './reducers/guideReducer';
import cardReducer from './reducers/cardReducer';
import userReducer from './reducers/userReducer';
import tokenReducer from './reducers/tokenReducer';

const rootReducer = combineReducers({
    guideReducer: guideReducer,
    cardReducer: cardReducer,
    userReducer: userReducer,
    tokenReducer: tokenReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;