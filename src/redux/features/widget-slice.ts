import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/redux/store'
import { MapDataSourcesEnum, WidgetListsEnum, WidgetSide, WidgetTabsEnum } from '@/utils/enums'

interface WidgetState {
    dataSource: MapDataSourcesEnum
    widgetSide: WidgetSide
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
        radius: number
    }
    isAboutOpened: boolean
    isMenuOpened: boolean
}

export const initialState: WidgetState = {
    dataSource: MapDataSourcesEnum.ALL_PLACES,
    widgetSide: WidgetSide.PLACES,
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
        radius: 50,
    },
    isAboutOpened: false,
    isMenuOpened: false,
}

function setWidgetDataSource(state: WidgetState) {
    if (state.widgetSide === WidgetSide.PLACES && state.places.isShowOnlySavedPlaces) {
        switch (state.places.activeTab) {
            case WidgetTabsEnum.ALL:
                state.dataSource = MapDataSourcesEnum.ALL_PLACES
                break
            case WidgetTabsEnum.SAVED:
                if (state.places.activeList === WidgetListsEnum.FAVORITES) {
                    state.dataSource = MapDataSourcesEnum.FAVORITES_PLACES
                }
                if (state.places.activeList === WidgetListsEnum.VISITED) {
                    state.dataSource = MapDataSourcesEnum.VISITED_PLACES
                }
                break
            default:
                state.dataSource = MapDataSourcesEnum.ALL_PLACES
                break
        }
    } else {
        state.dataSource = MapDataSourcesEnum.ALL_PLACES
    }
}

export const widgetSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setWidgetSide(state, action: PayloadAction<WidgetSide>) {
            state.widgetSide = action.payload
            setWidgetDataSource(state)
        },
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
            state.isMenuOpened = false
            state.isAboutOpened = !state.isAboutOpened
        },
        toggleWidgetMenuOpened(state) {
            state.isAboutOpened = false
            state.isMenuOpened = !state.isMenuOpened
        },
        setWidgetPlacesSelectedCategories(state, action) {
            state.places.selectedCategories = action.payload
        },
        setWidgetPlacesActiveTab(state, action: PayloadAction<WidgetTabsEnum>) {
            state.places.activeTab = action.payload
            setWidgetDataSource(state)
        },
        setWidgetPlacesActiveList(state, action: PayloadAction<WidgetListsEnum | null>) {
            state.places.activeList = action.payload
            setWidgetDataSource(state)
        },
        resetWidgetPLacesActiveList(state) {
            state.places.activeList = null
            state.dataSource = MapDataSourcesEnum.ALL_PLACES
        },
        toggleWidgetPlacesShowOnlySavedPlaces(state) {
            state.places.isShowOnlySavedPlaces = !state.places.isShowOnlySavedPlaces
            setWidgetDataSource(state)
        },
        setWidgetRandomSelectedCategories(state, action) {
            state.random.selectedCategories = action.payload
        },
        setWidgetRandomRadius(state, action) {
            state.random.radius = action.payload
        },
    },
})

export const getWidgetState = (state: RootState) => state.widget

export const {
    setWidgetSide,
    toggleWidgetPlacesOpened,
    toggleWidgetPlacesCategoryFilterOpened,
    toggleWidgetRandomOpened,
    toggleWidgetRandomCategoryFilterOpened,
    toggleWidgetAboutOpened,
    toggleWidgetMenuOpened,
    setWidgetPlacesSelectedCategories,
    setWidgetPlacesActiveTab,
    setWidgetPlacesActiveList,
    resetWidgetPLacesActiveList,
    toggleWidgetPlacesShowOnlySavedPlaces,
    setWidgetRandomSelectedCategories,
    setWidgetRandomRadius,
} = widgetSlice.actions

export default widgetSlice.reducer
