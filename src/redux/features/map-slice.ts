import type { LngLatBounds, ViewState } from 'react-map-gl'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { ILocationPopupInfo, IPlacePopupInfo } from '@/utils/types/map'

import type { RootState } from '@/redux/store'

interface MapState {
    viewState: Partial<ViewState>
    bounds: LngLatBounds | undefined
    placePopupInfo: IPlacePopupInfo | null
    locationPopupInfo: ILocationPopupInfo | null
}

export const initialState: MapState = {
    viewState: {
        latitude: 54.887928,
        longitude: 25.954196,
        zoom: 5,
    },
    bounds: undefined,
    placePopupInfo: null,
    locationPopupInfo: null,
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMapViewState(state, action: PayloadAction<Partial<ViewState>>) {
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

export const { setMapViewState, setMapBounds, setMapPlacePopupInfo, setMapLocationPopupInfo, closeMapPopups } =
    mapSlice.actions

export default mapSlice.reducer
