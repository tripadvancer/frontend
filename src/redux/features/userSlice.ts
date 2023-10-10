import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { AuthResponse, AuthUserResponse } from '@/types/auth'
import type { ICoordinates } from '@/types/geo'

import type { RootState } from '@/redux/store'

interface UserState {
    token: string | null
    user: AuthUserResponse | null
    userLocation: ICoordinates | null
    isAuth: boolean
    isOnboarded: boolean
    isCookieAccepted: boolean
}

export const initialState: UserState = {
    token: null,
    user: null,
    userLocation: null,
    isAuth: false,
    isOnboarded: true,
    isCookieAccepted: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<AuthResponse>) {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuth = true
        },
        unsetCredentials(state) {
            state.user = null
            state.token = null
            state.isAuth = false
        },
        setUserLocation(state, action: PayloadAction<ICoordinates>) {
            state.userLocation = action.payload
        },
        setOnboarded(state, action: PayloadAction<boolean>) {
            state.isOnboarded = action.payload
        },
        setCookieAccepted(state, action: PayloadAction<boolean>) {
            state.isCookieAccepted = action.payload
        },
    },
})

export const getCurrentUser = (state: RootState) => state.user.user
export const getUserLocation = (state: RootState) => state.user.userLocation
export const getToken = (state: RootState) => state.user.token
export const getIsAuth = (state: RootState) => state.user.isAuth
export const getIsOnboarded = (state: RootState) => state.user.isOnboarded
export const getIsCookieAccepted = (state: RootState) => state.user.isCookieAccepted

export const { setCredentials, unsetCredentials, setUserLocation, setOnboarded, setCookieAccepted } = userSlice.actions

export default userSlice.reducer
