import { createStore } from 'redux';
import rootReducer from './reducers';
import { devToolsEnhancer, EnhancerOptions } from 'redux-devtools-extension';

const enhancers : EnhancerOptions = { name: 'aptitude-cloud-redux-instance' };
const store = createStore(rootReducer, devToolsEnhancer(enhancers));

export type AppState = ReturnType<typeof rootReducer>;
export default store;