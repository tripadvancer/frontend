import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Route200Response } from '@stadiamaps/api'

import { RootState } from '@/redux/store'

interface RouteState {
    response: Route200Response | null
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
        setRouteResponse: (state, action: PayloadAction<Route200Response>) => {
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
