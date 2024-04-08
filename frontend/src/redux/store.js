import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import cartReducer from './cart/cartSlice.js'
import adminReducer from './admin/adminSlice.js'
import exploreReducer from './explore/exploreSlice'
import productCardReducer from './showProducts/showProductSlice'
import feedbackReducer from './feedback/feedbackSlice'
import searchReducer from './search/searchSlice'

const rootReducer = combineReducers({
    cart: cartReducer,
    admin: adminReducer,
    explore: exploreReducer,
    productCard: productCardReducer,
    feedback: feedbackReducer,
    search: searchReducer,
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storageSession,
    whitelist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)
