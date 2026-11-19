import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/utils/redux/store'
import { LngLat } from '@/utils/types/geo'

export type AnalyticsConsent = 'unset' | 'accepted' | 'rejected'

interface UserState {
    userLocation: LngLat | null
    analyticsConsent: AnalyticsConsent
    isCookieAccepted?: boolean
}

export const initialState: UserState = {
    userLocation: null,
    analyticsConsent: 'unset',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLocation(state, action: PayloadAction<LngLat>) {
            state.userLocation = action.payload
        },
        setAnalyticsConsent(state, action: PayloadAction<Exclude<AnalyticsConsent, 'unset'>>) {
            state.analyticsConsent = action.payload
            delete state.isCookieAccepted
        },
    },
})

export const getUserLocation = (state: RootState) => state.user.userLocation
export const getAnalyticsConsent = (state: RootState): AnalyticsConsent => {
    if (state.user?.analyticsConsent === 'unset' && state.user?.isCookieAccepted) {
        return 'accepted'
    }
    return state.user?.analyticsConsent ?? 'unset'
}

export const { setUserLocation, setAnalyticsConsent } = userSlice.actions

export default userSlice.reducer
