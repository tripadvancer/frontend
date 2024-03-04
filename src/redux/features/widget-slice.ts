import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/redux/store'
import { MapDataSourcesEnum, WidgetListsEnum, WidgetTabsEnum } from '@/utils/enums'

interface WidgetState {
    dataSource: MapDataSourcesEnum
    places: {
        isOpened: boolean
        isCategoryFilterOpened: boolean
        selectedCategories: number[]
        activeTab: WidgetTabsEnum
        activeList: WidgetListsEnum | null
        isShowOnlySavedPlaces: boolean
    }
    random: {
        isOpened: boolean
        isCategoryFilterOpened: boolean
        selectedCategories: number[]
    }
    isAboutOpened: boolean
    isMenuOpened: boolean
}

export const initialState: WidgetState = {
    dataSource: MapDataSourcesEnum.ALL_PLACES,
    places: {
        isOpened: true,
        isCategoryFilterOpened: false,
        selectedCategories: [],
        activeTab: WidgetTabsEnum.ALL,
        activeList: null,
        isShowOnlySavedPlaces: true,
    },
    random: {
        isOpened: true,
        isCategoryFilterOpened: false,
        selectedCategories: [],
    },
    isAboutOpened: false,
    isMenuOpened: false,
}

export const widgetSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        toggleWidgetPlacesOpened(state) {
            state.places.isOpened = !state.places.isOpened
        },
        toggleWidgetPlacesCategoryFilterOpened(state) {
            state.places.isCategoryFilterOpened = !state.places.isCategoryFilterOpened
        },
        toggleWidgetRandomOpened(state) {
            state.random.isOpened = !state.random.isOpened
        },
        toggleWidgetRandomCategoryFilterOpened(state) {
            state.random.isCategoryFilterOpened = !state.random.isCategoryFilterOpened
        },
        toggleWidgetAboutOpened(state) {
            state.isAboutOpened = !state.isAboutOpened
        },
        toggleWidgetMenuOpened(state) {
            state.isMenuOpened = !state.isMenuOpened
        },
    },
})

export const getWidgetState = (state: RootState) => state.widget

export const {
    toggleWidgetPlacesOpened,
    toggleWidgetPlacesCategoryFilterOpened,
    toggleWidgetRandomOpened,
    toggleWidgetRandomCategoryFilterOpened,
    toggleWidgetAboutOpened,
    toggleWidgetMenuOpened,
} = widgetSlice.actions

export default widgetSlice.reducer
