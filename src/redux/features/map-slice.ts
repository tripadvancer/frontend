import type { ViewState } from 'react-map-gl/maplibre'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/redux/store'
import { updateSelectedCategories } from '@/utils/helpers'

interface MapState {
    selectedCategories: number[]
    viewState: Partial<ViewState>
}

export const initialState: MapState = {
    selectedCategories: [],
    viewState: {
        latitude: 54.887928,
        longitude: 25.954196,
        zoom: 5,
    },
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
    },
})

export const getSelectedCategories = (state: RootState) => state.map.selectedCategories
export const getViewState = (state: RootState) => state.map.viewState

export const { setSelectedCategories, resetSelectedCategories, setViewState } = mapSlice.actions

export default mapSlice.reducer
