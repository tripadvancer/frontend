import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { IList } from '@/utils/types/list'

import type { RootState } from '@/redux/store'
import { WidgetTabsEnum } from '@/utils/enums'

interface WidgetState {
    activeTab: WidgetTabsEnum
    activeList: IList | null
    isAboutOpened: boolean
    isMenuOpened: boolean
    selectedCategories: number[]
}

export const initialState: WidgetState = {
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
        setWidgetActiveList(state, action: PayloadAction<IList | null>) {
            state.activeList = action.payload
        },
        resetWidgetActiveList(state) {
            state.activeList = null
        },
    },
})

export const getWidgetState = (state: RootState) => state.widget
export const getWidgetSelectedCategories = (state: RootState) => state.widget.selectedCategories

export const {
    toggleWidgetAbout,
    toggleWidgetMenu,
    setWidgetSelectedCategories,
    setWidgetActiveTab,
    setWidgetActiveList,
    resetWidgetActiveList,
} = widgetSlice.actions

export default widgetSlice.reducer
