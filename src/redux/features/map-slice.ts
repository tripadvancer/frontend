import { LngLatBounds, ViewState } from 'react-map-gl/maplibre'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CostingModel } from '@stadiamaps/api'

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
    isFilterMapBySavedLists: boolean
    viewState: Partial<ViewState>
    bounds: LngLatBounds | undefined
    placePopupInfo: IPlacePopupInfo | null
    locationPopupInfo: ILocationPopupInfo | null
    routeCostingModel: CostingModel
}

export const initialState: MapState = {
    isFilterMapBySavedLists: false,
    viewState: getDefaultViewState(),
    bounds: undefined,
    placePopupInfo: null,
    locationPopupInfo: null,
    routeCostingModel: CostingModel.Auto,
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setIsFilterMapBySavedLists(state, action: PayloadAction<boolean>) {
            state.isFilterMapBySavedLists = action.payload
        },
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
        setRouteCostingModel(state, action: PayloadAction<CostingModel>) {
            state.routeCostingModel = action.payload
        },
    },
})

export const getMapState = (state: RootState) => state.map
export const getMapViewState = (state: RootState) => state.map.viewState
export const getMapBounds = (state: RootState) => state.map.bounds
export const getIsFilterMapBySavedLists = (state: RootState) => state.map.isFilterMapBySavedLists
export const getRouteCostingModel = (state: RootState) => state.map.routeCostingModel

export const {
    setIsFilterMapBySavedLists,
    setMapViewState,
    setMapBounds,
    setMapPlacePopupInfo,
    setMapLocationPopupInfo,
    closeMapPopups,
    setRouteCostingModel,
} = mapSlice.actions

export default mapSlice.reducer
