import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { ICoordinates } from '@/utils/types/geo'

import type { RootState } from '@/redux/store'

interface UserState {
    userLocation: ICoordinates | null
    isOnboarded: boolean
    isCookieAccepted: boolean
}

export const initialState: UserState = {
    userLocation: null,
    isOnboarded: false,
    isCookieAccepted: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
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

export const getUserLocation = (state: RootState) => state.user.userLocation
export const getIsOnboarded = (state: RootState) => state.user.isOnboarded
export const getIsCookieAccepted = (state: RootState) => state.user.isCookieAccepted

export const { setUserLocation, setOnboarded, setCookieAccepted } = userSlice.actions

export default userSlice.reducer
