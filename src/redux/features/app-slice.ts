import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CostingModel } from '@stadiamaps/api'

import { RootState } from '@/redux/store'
import { AppModes } from '@/utils/enums'

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
        setAppMode(state, action: PayloadAction<AppModes>) {
            state.appMode = action.payload
        },
    },
})

export const getAppMode = (state: RootState) => state.app.appMode

export const { setAppMode } = appSlice.actions

export default appSlice.reducer
