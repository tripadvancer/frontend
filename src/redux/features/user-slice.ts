import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { ICoordinates } from '@/utils/types/geo'

import type { RootState } from '@/redux/store'

interface UserState {
    userLocation: ICoordinates | null
    isAuth: boolean
    isOnboarded: boolean
    isCookieAccepted: boolean
}

export const initialState: UserState = {
    userLocation: null,
    isAuth: false,
    isOnboarded: false,
    isCookieAccepted: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials(state) {
            state.isAuth = true
        },
        unSetCredentials(state) {
            state.isAuth = false
        },
        setUserLocation(state, action: PayloadAction<ICoordinates>) {
            state.userLocation = action.payload
        },
        setOnboarded(state) {
            state.isOnboarded = true
        },
        setCookieAccepted(state) {
            state.isCookieAccepted = true
        },
    },
})

export const getIsAuth = (state: RootState) => state.user.isAuth
export const getUserLocation = (state: RootState) => state.user.userLocation
export const getIsOnboarded = (state: RootState) => state.user.isOnboarded
export const getIsCookieAccepted = (state: RootState) => state.user.isCookieAccepted

export const { setCredentials, unSetCredentials, setUserLocation, setOnboarded, setCookieAccepted } = userSlice.actions

export default userSlice.reducer
