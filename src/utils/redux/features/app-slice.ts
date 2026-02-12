import { createSlice } from '@reduxjs/toolkit'

import { AppModes } from '@/utils/enums'
import { RootState } from '@/utils/redux/store'

interface AppState {
    appMode: AppModes
}

export const initialState: AppState = {
    appMode: AppModes.MAP,
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
