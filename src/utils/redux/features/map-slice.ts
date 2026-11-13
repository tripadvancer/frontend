import { LngLatBounds, ViewState } from 'react-map-gl/maplibre'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { getDefaultViewState } from '@/utils/helpers/maps'
import { RootState } from '@/utils/redux/store'
import { LngLat } from '@/utils/types/geo'

type IPlacePopupInfo = {
    id: number
    title: string
    cover: string | null
    countryCode: string | null
    avgRating: number | null
    reviewsCount: number
    isSaved: boolean
    coordinates: number[]
}

type ILocationPopupInfo = {
    coordinates: LngLat
}

interface MapState {
    isFilterMapBySavedLists: boolean
    searchWhileMoving: boolean
    viewState: Partial<ViewState>
    bounds: LngLatBounds | undefined
    pendingBounds: LngLatBounds | undefined
    placePopupInfo: IPlacePopupInfo | null
    locationPopupInfo: ILocationPopupInfo | null
}

export const initialState: MapState = {
    isFilterMapBySavedLists: false,
    searchWhileMoving: true,
    viewState: getDefaultViewState(),
    bounds: undefined,
    pendingBounds: undefined,
    placePopupInfo: null,
    locationPopupInfo: null,
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setIsFilterMapBySavedLists(state, action: PayloadAction<boolean>) {
            state.isFilterMapBySavedLists = action.payload
        },
        setSearchWhileMoving(state, action: PayloadAction<boolean>) {
            state.searchWhileMoving = action.payload

            if (action.payload && state.pendingBounds) {
                state.bounds = state.pendingBounds
                state.pendingBounds = undefined
            }
        },
        setMapViewState(state, action: PayloadAction<Partial<ViewState>>) {
            state.viewState = action.payload
        },
        setMapBounds(state, action: PayloadAction<LngLatBounds>) {
            state.bounds = action.payload
            state.pendingBounds = undefined
        },
        setPendingMapBounds(state, action: PayloadAction<LngLatBounds>) {
            state.pendingBounds = action.payload

            if (state.searchWhileMoving) {
                state.bounds = action.payload
                state.pendingBounds = undefined
            }
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
export const getMapBounds = (state: RootState) => state.map.bounds
export const getPendingMapBounds = (state: RootState) => state.map.pendingBounds
export const getIsFilterMapBySavedLists = (state: RootState) => state.map.isFilterMapBySavedLists

export const {
    setIsFilterMapBySavedLists,
    setSearchWhileMoving,
    setMapViewState,
    setMapBounds,
    setPendingMapBounds,
    setMapPlacePopupInfo,
    setMapLocationPopupInfo,
    closeMapPopups,
} = mapSlice.actions

export default mapSlice.reducer
