import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/redux/store'
import { AppMode } from '@/utils/enums'

interface AppState {
    appMode: AppMode
}

export const initialState: AppState = {
    appMode: AppMode.MAP,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppMode(state, action) {
            state.appMode = action.payload
        },
    },
})

export const getAppMode = (state: RootState) => state.app.appMode

export const { setAppMode } = appSlice.actions

export default appSlice.reducer
