import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/utils/redux/store'
import { LngLat } from '@/utils/types/geo'

interface UserState {
    userLocation: LngLat | null
    isCookieAccepted: boolean
}

export const initialState: UserState = {
    userLocation: null,
    isCookieAccepted: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLocation(state, action: PayloadAction<LngLat>) {
            state.userLocation = action.payload
        },
        setCookieAccepted(state) {
            state.isCookieAccepted = true
        },
    },
})

export const getUserLocation = (state: RootState) => state.user.userLocation
export const getIsCookieAccepted = (state: RootState) => state.user.isCookieAccepted

export const { setUserLocation, setCookieAccepted } = userSlice.actions

export default userSlice.reducer
