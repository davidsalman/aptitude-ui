import { createFirestoreInstance } from 'redux-firestore'
import firebase from './firebase';
import store from '../redux';
import rrfConfig from '../configs/rrf'

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

export { store };
export default rrfProps;