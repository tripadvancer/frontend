import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/redux/store'
import { updateSelectedCategories } from '@/utils/helpers'

interface MapState {
    selectedCategories: number[]
}

export const initialState: MapState = {
    selectedCategories: [],
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
    },
})

export const getSelectedCategories = (state: RootState) => state.map.selectedCategories

export const { setSelectedCategories, resetSelectedCategories } = mapSlice.actions

export default mapSlice.reducer
