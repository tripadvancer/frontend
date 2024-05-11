import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '@/redux/store'
import { WidgetSideEnum, WidgetTabsEnum } from '@/utils/enums'

interface WidgetState {
    activeSide: WidgetSideEnum
    activeTab: WidgetTabsEnum
    activeList: number | null
    isAboutOpened: boolean
    isMenuOpened: boolean
    selectedCategories: number[]
}

export const initialState: WidgetState = {
    activeSide: WidgetSideEnum.PLACES,
    activeTab: WidgetTabsEnum.ALL,
    activeList: null,
    isAboutOpened: false,
    isMenuOpened: false,
    selectedCategories: [],
}

export const widgetSlice = createSlice({
    name: 'widget',
    initialState,
    reducers: {
        setWidgetActiveSide(state, action: PayloadAction<WidgetSideEnum>) {
            state.activeSide = action.payload
        },
        toggleWidgetAbout(state) {
            state.isMenuOpened = false
            state.isAboutOpened = !state.isAboutOpened
        },
        toggleWidgetMenu(state) {
            state.isAboutOpened = false
            state.isMenuOpened = !state.isMenuOpened
        },
        setWidgetSelectedCategories(state, action: PayloadAction<number[]>) {
            state.selectedCategories = action.payload
        },
        setWidgetActiveTab(state, action: PayloadAction<WidgetTabsEnum>) {
            state.activeTab = action.payload
        },
        setWidgetActiveList(state, action: PayloadAction<number>) {
            state.activeList = action.payload
        },
        resetWidgetActiveList(state) {
            state.activeList = null
        },
    },
})

export const getWidgetState = (state: RootState) => state.widget
export const getWidgetActiveSide = (state: RootState) => state.widget.activeSide
export const getWidgetSelectedCategories = (state: RootState) => state.widget.selectedCategories

export const {
    setWidgetActiveSide,
    toggleWidgetAbout,
    toggleWidgetMenu,
    setWidgetSelectedCategories,
    setWidgetActiveTab,
    setWidgetActiveList,
    resetWidgetActiveList,
} = widgetSlice.actions

export default widgetSlice.reducer
