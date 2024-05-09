import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/redux/store'
import { MobileMapLayoutEnum } from '@/utils/enums'

interface AppState {
    mobileMapLayout: MobileMapLayoutEnum
    isHeaderMenuOpened: boolean
}

export const initialState: AppState = {
    mobileMapLayout: MobileMapLayoutEnum.MAP,
    isHeaderMenuOpened: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setMobileMapLayout(state, action) {
            state.mobileMapLayout = action.payload
        },
        toggleHeaderMenu(state) {
            state.isHeaderMenuOpened = !state.isHeaderMenuOpened
        },
    },
})

export const getMobileMapLayout = (state: RootState) => state.app.mobileMapLayout
export const getIsHeaderMenuOpened = (state: RootState) => state.app.isHeaderMenuOpened

export const { setMobileMapLayout, toggleHeaderMenu } = appSlice.actions

export default appSlice.reducer
