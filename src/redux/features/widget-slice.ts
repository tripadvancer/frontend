import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/redux/store'
import { MapDataSourcesEnum, WidgetListsEnum, WidgetTabsEnum } from '@/utils/enums'

interface WidgetState {
    activeList: WidgetListsEnum | null
    activeTab: WidgetTabsEnum
    dataSource: MapDataSourcesEnum
    isAboutOpened: boolean
    isCategoriesOpened: boolean
    isMenuOpened: boolean
    isPlacesOpened: boolean
    isShowOnlySavedPlaces: boolean
    randomRadius: number
    selectedCategories: number[]
    widgetIsExpanded: boolean // only for mobile
}

export const initialState: WidgetState = {
    activeList: null,
    activeTab: WidgetTabsEnum.ALL,
    dataSource: MapDataSourcesEnum.ALL_PLACES,
    isAboutOpened: false,
    isCategoriesOpened: false,
    isMenuOpened: false,
    isPlacesOpened: true,
    isShowOnlySavedPlaces: true,
    randomRadius: 50,
    selectedCategories: [],
    widgetIsExpanded: false,
}

function setWidgetDataSource(state: WidgetState) {
    if (state.isShowOnlySavedPlaces) {
        switch (state.activeTab) {
            case WidgetTabsEnum.ALL:
                state.dataSource = MapDataSourcesEnum.ALL_PLACES
                break
            case WidgetTabsEnum.SAVED:
                if (state.activeList === WidgetListsEnum.FAVORITES) {
                    state.dataSource = MapDataSourcesEnum.FAVORITES_PLACES
                }
                if (state.activeList === WidgetListsEnum.VISITED) {
                    state.dataSource = MapDataSourcesEnum.VISITED_PLACES
                }
                break
            case WidgetTabsEnum.RANDOM:
                state.dataSource = MapDataSourcesEnum.ALL_PLACES
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
    name: 'widget',
    initialState,
    reducers: {
        resetWidgetState() {
            return initialState
        },
        toggleWidget(state) {
            state.widgetIsExpanded = !state.widgetIsExpanded
            state.isAboutOpened = false
            state.isMenuOpened = false
        },
        toggleWidgetPlacesOpened(state) {
            state.isPlacesOpened = !state.isPlacesOpened
        },
        toggleWidgetCategoriesOpened(state) {
            state.isCategoriesOpened = !state.isCategoriesOpened
        },
        toggleWidgetAbout(state) {
            state.isMenuOpened = false
            state.isAboutOpened = !state.isAboutOpened
        },
        toggleWidgetMenu(state) {
            state.isAboutOpened = false
            state.isMenuOpened = !state.isMenuOpened
        },
        toggleWidgetShowOnlySavedPlaces(state) {
            state.isShowOnlySavedPlaces = !state.isShowOnlySavedPlaces
            setWidgetDataSource(state)
        },
        setWidgetSelectedCategories(state, action: PayloadAction<number[]>) {
            state.selectedCategories = action.payload
        },
        setWidgetActiveTab(state, action: PayloadAction<WidgetTabsEnum>) {
            state.activeTab = action.payload
            setWidgetDataSource(state)
        },
        setWidgetActiveList(state, action: PayloadAction<WidgetListsEnum | null>) {
            state.activeList = action.payload
            setWidgetDataSource(state)
        },
        resetWidgetActiveList(state) {
            state.activeList = null
            state.dataSource = MapDataSourcesEnum.ALL_PLACES
        },
        setWidgetRandomRadius(state, action) {
            state.randomRadius = action.payload
        },
    },
})

export const getWidgetState = (state: RootState) => state.widget

export const {
    resetWidgetState,
    toggleWidget,
    toggleWidgetPlacesOpened,
    toggleWidgetCategoriesOpened,
    toggleWidgetAbout,
    toggleWidgetMenu,
    toggleWidgetShowOnlySavedPlaces,
    setWidgetSelectedCategories,
    setWidgetActiveTab,
    setWidgetActiveList,
    resetWidgetActiveList,
    setWidgetRandomRadius,
} = widgetSlice.actions

export default widgetSlice.reducer
