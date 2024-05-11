import type { LngLatBounds, ViewState } from 'react-map-gl/maplibre'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { ILocationPopupInfo, IPlacePopupInfo } from '@/utils/types/map'

import type { RootState } from '@/redux/store'
import { MapModes } from '@/utils/enums'
import { getDefaultViewState } from '@/utils/helpers/maps'

interface MapState {
    mapMode: MapModes
    viewState: ViewState
    bounds: LngLatBounds | undefined
    placePopupInfo: IPlacePopupInfo | null
    locationPopupInfo: ILocationPopupInfo | null
}

export const initialState: MapState = {
    mapMode: MapModes.DEFAULT,
    viewState: getDefaultViewState(),
    bounds: undefined,
    placePopupInfo: null,
    locationPopupInfo: null,
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMapMode(state, action: PayloadAction<MapModes>) {
            state.mapMode = action.payload
        },
        setMapViewState(state, action: PayloadAction<ViewState>) {
            state.viewState = action.payload
        },
        setMapBounds(state, action: PayloadAction<LngLatBounds>) {
            state.bounds = action.payload
        },
        setMapPlacePopupInfo(state, action: PayloadAction<IPlacePopupInfo | null>) {
            state.placePopupInfo = action.payload
            state.locationPopupInfo = null
        },
        setMapLocationPopupInfo(state, action: PayloadAction<ILocationPopupInfo | null>) {
            state.placePopupInfo = null
            state.locationPopupInfo = action.payload
        },
        closeMapPopups(state) {
            state.placePopupInfo = null
            state.locationPopupInfo = null
        },
    },
})

export const getMapState = (state: RootState) => state.map
export const getMapBounds = (state: RootState) => state.map.bounds
export const getMapMode = (state: RootState) => state.map.mapMode

export const {
    setMapMode,
    setMapViewState,
    setMapBounds,
    setMapPlacePopupInfo,
    setMapLocationPopupInfo,
    closeMapPopups,
} = mapSlice.actions

export default mapSlice.reducer
