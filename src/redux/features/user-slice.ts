import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/redux/store'
import { LngLat } from '@/utils/types/geo'

interface UserState {
    userLocation: LngLat | null
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
        setUserLocation(state, action: PayloadAction<LngLat>) {
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

export const getUserLocation = (state: RootState) => state.user.userLocation
export const getIsOnboarded = (state: RootState) => state.user.isOnboarded
export const getIsCookieAccepted = (state: RootState) => state.user.isCookieAccepted

export const { setUserLocation, setOnboarded, setCookieAccepted } = userSlice.actions

export default userSlice.reducer
