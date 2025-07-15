import { ViewState } from 'react-map-gl/maplibre'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/redux/store'
import { getDefaultViewState } from '@/utils/helpers/maps'
import { LngLat } from '@/utils/types/geo'

type IPlacePopupInfo = {
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    isSaved: boolean
    coordinates: number[]
}

type ILocationPopupInfo = {
    coordinates: LngLat
}

interface MapState {
    viewState: Partial<ViewState>
    placePopupInfo: IPlacePopupInfo | null
    locationPopupInfo: ILocationPopupInfo | null
}

export const initialState: MapState = {
    viewState: getDefaultViewState(),
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
export const getMapViewState = (state: RootState) => state.map.viewState

export const { setMapViewState, setMapPlacePopupInfo, setMapLocationPopupInfo, closeMapPopups } = mapSlice.actions

export default mapSlice.reducer
