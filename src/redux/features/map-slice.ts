import type { LngLatBounds, ViewState } from 'react-map-gl'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'

import type { RootState } from '@/redux/store'
import { MapDataSourcesEnum, WidgetListsEnum, WidgetTabsEnum } from '@/utils/enums'
import { updateSelectedCategories } from '@/utils/helpers'

interface MapState {
    viewState: Partial<ViewState>
    bounds: LngLatBounds | undefined
    dataSource: MapDataSourcesEnum
    placePopupInfo: IPlacePreview | null
    locationPopupInfo: ILocationPreview | null
    widget: {
        selectedCategories: number[]
        activeTab: WidgetTabsEnum
        activeList: WidgetListsEnum | null
        isCategoriesVisible: boolean
        isPlacesVisible: boolean
        isShowOnlySavedPlaces: boolean
    }
}

export const initialState: MapState = {
    viewState: {
        latitude: 54.887928,
        longitude: 25.954196,
        zoom: 5,
    },
    bounds: undefined,
    dataSource: MapDataSourcesEnum.ALL_PLACES,
    placePopupInfo: null,
    locationPopupInfo: null,
    widget: {
        selectedCategories: [],
        activeTab: WidgetTabsEnum.ALL,
        activeList: null,
        isCategoriesVisible: false,
        isPlacesVisible: true,
        isShowOnlySavedPlaces: true,
    },
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMapViewState(state, action: PayloadAction<Partial<ViewState>>) {
            state.viewState = action.payload
        },
        setMapBounds(state, action: PayloadAction<LngLatBounds>) {
            state.bounds = action.payload
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
        setWidgetSelectedCategories(state, action: PayloadAction<number>) {
            const categoryId = action.payload
            const updatedSelectedCategories = updateSelectedCategories(state.widget.selectedCategories, categoryId)
            state.widget.selectedCategories = updatedSelectedCategories
            state.placePopupInfo = null
            state.locationPopupInfo = null
        },
        resetWidgetSelectedCategories(state) {
            state.widget.selectedCategories = []
        },
        setWidgetActiveTab(state, action: PayloadAction<WidgetTabsEnum>) {
            state.widget.activeTab = action.payload
            state.placePopupInfo = null
            state.locationPopupInfo = null

            if (state.widget.isShowOnlySavedPlaces) {
                switch (action.payload) {
                    case WidgetTabsEnum.ALL:
                        state.dataSource = MapDataSourcesEnum.ALL_PLACES
                        break
                    case WidgetTabsEnum.SAVED:
                        if (state.widget.activeList === WidgetListsEnum.FAVORITES) {
                            state.dataSource = MapDataSourcesEnum.FAVORITES_PLACES
                        }
                        if (state.widget.activeList === WidgetListsEnum.VISITED) {
                            state.dataSource = MapDataSourcesEnum.VISITED_PLACES
                        }
                        break
                    default:
                        state.dataSource = MapDataSourcesEnum.ALL_PLACES
                        break
                }
            }
        },
        setWidgetActiveList(state, action: PayloadAction<WidgetListsEnum | null>) {
            state.widget.activeList = action.payload
            state.placePopupInfo = null
            state.locationPopupInfo = null

            if (state.widget.isShowOnlySavedPlaces) {
                switch (action.payload) {
                    case WidgetListsEnum.FAVORITES:
                        state.dataSource = MapDataSourcesEnum.FAVORITES_PLACES
                        break
                    case WidgetListsEnum.VISITED:
                        state.dataSource = MapDataSourcesEnum.VISITED_PLACES
                        break
                    default:
                        state.dataSource = MapDataSourcesEnum.ALL_PLACES
                        break
                }
            }
        },
        resetWidgetActiveList(state) {
            state.widget.activeList = null
            state.dataSource = MapDataSourcesEnum.ALL_PLACES
            state.placePopupInfo = null
            state.locationPopupInfo = null
        },
        toggleShowOnlySavedPlaces(state) {
            state.widget.isShowOnlySavedPlaces = !state.widget.isShowOnlySavedPlaces
            state.placePopupInfo = null
            state.locationPopupInfo = null

            if (state.widget.isShowOnlySavedPlaces) {
                switch (state.widget.activeTab) {
                    case WidgetTabsEnum.ALL:
                        state.dataSource = MapDataSourcesEnum.ALL_PLACES
                        break
                    case WidgetTabsEnum.SAVED:
                        if (state.widget.activeList === WidgetListsEnum.FAVORITES) {
                            state.dataSource = MapDataSourcesEnum.FAVORITES_PLACES
                        }
                        if (state.widget.activeList === WidgetListsEnum.VISITED) {
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
        },
        toggleWidgetCategoriesVisibility(state) {
            state.widget.isCategoriesVisible = !state.widget.isCategoriesVisible
        },
        toggleWidgetPlacesVisibility(state) {
            state.widget.isPlacesVisible = !state.widget.isPlacesVisible
        },
    },
})

export const getMapViewState = (state: RootState) => state.map.viewState
export const getMapBounds = (state: RootState) => state.map.bounds
export const getMapDataSource = (state: RootState) => state.map.dataSource
export const getPlacePopupInfo = (state: RootState) => state.map.placePopupInfo
export const getLocationPopupInfo = (state: RootState) => state.map.locationPopupInfo
export const getWidgetSelectedCategories = (state: RootState) => state.map.widget.selectedCategories
export const getWidgetActiveTab = (state: RootState) => state.map.widget.activeTab
export const getWidgetActiveList = (state: RootState) => state.map.widget.activeList
export const getWidgetCategoriesVisibility = (state: RootState) => state.map.widget.isCategoriesVisible
export const getWidgetPlacesVisibility = (state: RootState) => state.map.widget.isPlacesVisible
export const getShowOnlySavedPlaces = (state: RootState) => state.map.widget.isShowOnlySavedPlaces

export const {
    setMapViewState,
    setMapBounds,
    setPlacePopupInfo,
    setLocationPopupInfo,
    closePopups,
    setWidgetSelectedCategories,
    resetWidgetSelectedCategories,
    setWidgetActiveTab,
    setWidgetActiveList,
    resetWidgetActiveList,
    toggleShowOnlySavedPlaces,
    toggleWidgetCategoriesVisibility,
    toggleWidgetPlacesVisibility,
} = mapSlice.actions

export default mapSlice.reducer
