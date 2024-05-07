import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/redux/store'

interface AppState {
    isHeaderMenuOpened: boolean
}

export const initialState: AppState = {
    isHeaderMenuOpened: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleHeaderMenu(state) {
            state.isHeaderMenuOpened = !state.isHeaderMenuOpened
        },
    },
})

export const getIsHeaderMenuOpened = (state: RootState) => state.app.isHeaderMenuOpened

export const { toggleHeaderMenu } = appSlice.actions

export default appSlice.reducer
