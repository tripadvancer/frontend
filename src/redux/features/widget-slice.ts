import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IList } from '@/utils/types/list'

import type { RootState } from '@/redux/store'
import { MapDataSourcesEnum, WidgetTabsEnum } from '@/utils/enums'

interface WidgetState {
    dataSource: MapDataSourcesEnum
    activeTab: WidgetTabsEnum
    activeList: IList | null
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
    dataSource: MapDataSourcesEnum.ALL_PLACES,
    activeTab: WidgetTabsEnum.ALL,
    activeList: null,
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
                state.dataSource = MapDataSourcesEnum.SAVED_PLACES
                // if (state.activeList?.type === WidgetListsEnum.FAVORITES) {
                //     state.dataSource = MapDataSourcesEnum.FAVORITES_PLACES
                // }
                // if (state.activeList?.type === WidgetListsEnum.VISITED) {
                //     state.dataSource = MapDataSourcesEnum.VISITED_PLACES
                // }
                // if (state.activeList?.type === WidgetListsEnum.USER_LISTS) {
                //     state.dataSource = MapDataSourcesEnum.USER_LISTS
                // }
                break
            case WidgetTabsEnum.VISITED:
                state.dataSource = MapDataSourcesEnum.VISITED_PLACES
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
        closeWidget(state) {
            state.widgetIsExpanded = false
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
        setWidgetActiveList(state, action: PayloadAction<IList | null>) {
            state.activeList = action.payload
            setWidgetDataSource(state)
        },
        resetWidgetActiveList(state) {
            state.dataSource = MapDataSourcesEnum.ALL_PLACES
            state.activeList = null
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
    closeWidget,
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
