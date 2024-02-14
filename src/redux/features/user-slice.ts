import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { ICoordinates } from '@/utils/types/geo'
import type { IUserInfo } from '@/utils/types/user'

import type { RootState } from '@/redux/store'

interface UserState {
    userInfo: IUserInfo | null
    userLocation: ICoordinates | null
    isOnboarded: boolean
    isCookieAccepted: boolean
}

export const initialState: UserState = {
    userInfo: null,
    userLocation: null,
    isOnboarded: false,
    isCookieAccepted: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<IUserInfo>) {
            state.userInfo = action.payload
        },
        unSetCredentials(state) {
            state.userInfo = null
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

export const getUserInfo = (state: RootState) => state.user.userInfo
export const getUserLocation = (state: RootState) => state.user.userLocation
export const getIsOnboarded = (state: RootState) => state.user.isOnboarded
export const getIsCookieAccepted = (state: RootState) => state.user.isCookieAccepted

export const { setCredentials, unSetCredentials, setUserLocation, setOnboarded, setCookieAccepted } = userSlice.actions

export default userSlice.reducer
