import type { ViewState } from 'react-map-gl/maplibre'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'

import type { RootState } from '@/redux/store'
import { updateSelectedCategories } from '@/utils/helpers'

interface MapState {
    selectedCategories: number[]
    viewState: Partial<ViewState>
    placePopupInfo: IPlacePreview | null
    locationPopupInfo: ILocationPreview | null
}

export const initialState: MapState = {
    selectedCategories: [],
    viewState: {
        latitude: 54.887928,
        longitude: 25.954196,
        zoom: 5,
    },
    placePopupInfo: null,
    locationPopupInfo: null,
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setSelectedCategories(state, action: PayloadAction<number>) {
            const categoryId = action.payload
            const updatedSelectedCategories = updateSelectedCategories(state.selectedCategories, categoryId)
            state.selectedCategories = updatedSelectedCategories
        },
        resetSelectedCategories(state) {
            state.selectedCategories = []
        },
        setViewState(state, action: PayloadAction<Partial<ViewState>>) {
            state.viewState = action.payload
        },
        setPlacePopupInfo(state, action: PayloadAction<IPlacePreview | null>) {
            state.placePopupInfo = action.payload
            state.locationPopupInfo = null
        },
        setLocationPopupInfo(state, action: PayloadAction<ILocationPreview | null>) {
            state.placePopupInfo = null
            state.locationPopupInfo = action.payload
        },
        closePopups(state) {
            state.placePopupInfo = null
            state.locationPopupInfo = null
        },
    },
})

export const getSelectedCategories = (state: RootState) => state.map.selectedCategories
export const getViewState = (state: RootState) => state.map.viewState
export const getPlacePopupInfo = (state: RootState) => state.map.placePopupInfo
export const getLocationPopupInfo = (state: RootState) => state.map.locationPopupInfo

export const {
    setSelectedCategories,
    resetSelectedCategories,
    setViewState,
    setPlacePopupInfo,
    setLocationPopupInfo,
    closePopups,
} = mapSlice.actions

export default mapSlice.reducer
