import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { ICoordinates } from '@/utils/types/geo'
import { IUserInfo } from '@/utils/types/user'

import type { RootState } from '@/redux/store'

interface UserState {
    user: IUserInfo | null
    userLocation: ICoordinates | null
    isAuth: boolean
    isOnboarded: boolean
    isCookieAccepted: boolean
}

export const initialState: UserState = {
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
        setCredentials(state, action: PayloadAction<IUserInfo>) {
            state.user = action.payload
            state.isAuth = true
        },
        unsetCredentials(state) {
            state.user = null
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
export const getIsAuth = (state: RootState) => state.user.isAuth
export const getIsOnboarded = (state: RootState) => state.user.isOnboarded
export const getIsCookieAccepted = (state: RootState) => state.user.isCookieAccepted

export const { setCredentials, unsetCredentials, setUserLocation, setOnboarded, setCookieAccepted } = userSlice.actions

export default userSlice.reducer
