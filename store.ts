import {createStore, combineReducers} from 'redux';
import guideReducer from './reducers/guideReducer';
import cardReducer from './reducers/cardReducer';

const rootReducer = combineReducers({
    guideReducer: guideReducer,
    cardReducer: cardReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;