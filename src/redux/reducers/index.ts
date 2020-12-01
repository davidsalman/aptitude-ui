import { Reducer, combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer, FirebaseReducer, FirestoreReducer } from 'react-redux-firebase';
import { IProfile, ISchema } from '../types'

interface RootState {
  firebase: FirebaseReducer.Reducer<IProfile, ISchema>
  firestore: FirestoreReducer.Reducer
}

const rootReducer = combineReducers<RootState>({
  firebase: firebaseReducer,
  firestore: firestoreReducer as Reducer<any, any>
})

export default rootReducer