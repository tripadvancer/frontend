import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createTransform, persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import appReducer from '@/utils/redux/features/app-slice'
import mapReducer from '@/utils/redux/features/map-slice'
import userReducer from '@/utils/redux/features/user-slice'
import widgetReducer from '@/utils/redux/features/widget-slice'
import { api } from '@/utils/redux/services/api'
import { internalAPI } from '@/utils/redux/services/internal/internal.api'

const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null)
        },
        setItem(_key: string, value: string) {
            return Promise.resolve(value)
        },
        removeItem(_key: string) {
            return Promise.resolve()
        },
    }
}

const storage = typeof window === 'undefined' ? createNoopStorage() : createWebStorage('local')

const userLocationTransform = createTransform(
    (state: { userLocation?: unknown }) => ({ ...state, userLocation: null }),
    (state: { userLocation?: unknown }) => ({ ...state, userLocation: null }),
    { whitelist: ['user'] },
)

const mapLocationTransform = createTransform(
    (state: { viewState?: Record<string, unknown> }) => ({
        ...state,
        viewState: state.viewState
            ? Object.fromEntries(
                  Object.entries(state.viewState).filter(([key]) => !['longitude', 'latitude'].includes(key)),
              )
            : {},
        bounds: undefined,
        placePopupInfo: null,
        locationPopupInfo: null,
    }),
    (state: { viewState?: Record<string, unknown> }) => ({
        ...state,
        viewState: state.viewState
            ? Object.fromEntries(
                  Object.entries(state.viewState).filter(([key]) => !['longitude', 'latitude'].includes(key)),
              )
            : {},
        bounds: undefined,
        placePopupInfo: null,
        locationPopupInfo: null,
    }),
    { whitelist: ['map'] },
)

const persistConfig = {
    key: 'tripadvancer:store:v5.3',
    storage,
    whitelist: ['map', 'user', 'widget'],
    transforms: [userLocationTransform, mapLocationTransform],
}

const reducers = combineReducers({
    app: appReducer,
    map: mapReducer,
    user: userReducer,
    widget: widgetReducer,
    [api.reducerPath]: api.reducer,
    [internalAPI.reducerPath]: internalAPI.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat([api.middleware, internalAPI.middleware]),
    devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
