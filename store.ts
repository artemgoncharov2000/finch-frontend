import {createStore, combineReducers} from 'redux';
import guideReducer from './reducers/guideReducer';

const rootReducer = combineReducers({
    guideReducer: guideReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;