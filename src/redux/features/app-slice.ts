import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/redux/store'
import { MobileMapLayoutEnum } from '@/utils/enums'

interface AppState {
    mobileMapLayout: MobileMapLayoutEnum
}

export const initialState: AppState = {
    mobileMapLayout: MobileMapLayoutEnum.MAP,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setMobileMapLayout(state, action) {
            state.mobileMapLayout = action.payload
        },
    },
})

export const getMobileMapLayout = (state: RootState) => state.app.mobileMapLayout

export const { setMobileMapLayout } = appSlice.actions

export default appSlice.reducer
