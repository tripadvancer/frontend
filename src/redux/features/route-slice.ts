import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RouteResponse } from '@stadiamaps/api'

import { RootState } from '@/redux/store'

interface RouteState {
    response: RouteResponse | null
    isRoutingDisabled: boolean
}

export const initialState: RouteState = {
    response: null,
    isRoutingDisabled: false,
}

export const routeSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {
        setRouteResponse: (state, action: PayloadAction<RouteResponse>) => {
            state.response = action.payload
        },
        setIsRoutingDisabled: (state, action: PayloadAction<boolean>) => {
            state.isRoutingDisabled = action.payload
        },
        resetRoute: state => {
            state.response = null
        },
    },
})

export const getRouteResponse = (state: RootState) => state.route.response
export const getIsRoutingDisabled = (state: RootState) => state.route.isRoutingDisabled

export const { setRouteResponse, setIsRoutingDisabled, resetRoute } = routeSlice.actions

export default routeSlice.reducer
