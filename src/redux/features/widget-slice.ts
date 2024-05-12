import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { IList } from '@/utils/types/list'

import type { RootState } from '@/redux/store'
import { WidgetModes, WidgetTabs } from '@/utils/enums'

interface WidgetState {
    mode: WidgetModes
    activeTab: WidgetTabs
    activeList: IList | null
    isAboutOpened: boolean
    isMenuOpened: boolean
    selectedCategories: number[]
}

export const initialState: WidgetState = {
    mode: WidgetModes.PLACES,
    activeTab: WidgetTabs.ALL,
    activeList: null,
    isAboutOpened: false,
    isMenuOpened: false,
    selectedCategories: [],
}

export const widgetSlice = createSlice({
    name: 'widget',
    initialState,
    reducers: {
        setWidgetMode(state, action: PayloadAction<WidgetModes>) {
            state.mode = action.payload
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
        setWidgetActiveTab(state, action: PayloadAction<WidgetTabs>) {
            state.activeTab = action.payload
        },
        setWidgetActiveList(state, action: PayloadAction<IList | null>) {
            state.activeList = action.payload
        },
    },
})

export const getWidgetState = (state: RootState) => state.widget
export const getWidgetMode = (state: RootState) => state.widget.mode
export const getWidgetActiveTab = (state: RootState) => state.widget.activeTab
export const getWidgetActiveList = (state: RootState) => state.widget.activeList
export const getWidgetSelectedCategories = (state: RootState) => state.widget.selectedCategories

export const {
    setWidgetMode,
    toggleWidgetAbout,
    toggleWidgetMenu,
    setWidgetSelectedCategories,
    setWidgetActiveTab,
    setWidgetActiveList,
} = widgetSlice.actions

export default widgetSlice.reducer
