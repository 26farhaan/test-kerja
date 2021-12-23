import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import globalReducer from './reducer';
import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage,
}

const reducers = combineReducers({
    globalReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
  }

// const store = createStore(reducers)
// export default store