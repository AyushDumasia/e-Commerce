import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import cartReducer from './cart/cartSlice.js'
import adminReducer from './admin/adminSlice.js'
import exploreReducer from './explore/exploreSlice'
import productCardReducer from './showProducts/showProductSlice'
import feedbackReducer from './feedback/feedbackSlice'
import searchReducer from './search/searchSlice'
import suggestedReducer from './suggestedProducts/suggestedProductSlice.jsx'
import userReducer from './user/userSlice.js'
import merchantReducer from './merchant/merchantSlice.js'
import profileSlice from './profile/profile.js'
import adminPanel from './adminPanel/adminPanelSlice.js'

const rootReducer = combineReducers({
    user: userReducer,
    adminPanel: adminPanel,
    merchant: merchantReducer,
    cart: cartReducer,
    admin: adminReducer,
    explore: exploreReducer,
    productCard: productCardReducer,
    feedback: feedbackReducer,
    search: searchReducer,
    suggestedProduct: suggestedReducer,
    profile: profileSlice,
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storageSession,
    whitelist: ['user', 'merchant', 'adminPanel'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)
