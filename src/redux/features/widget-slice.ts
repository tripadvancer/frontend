import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { IList } from '@/utils/types/list'

import type { RootState } from '@/redux/store'
import { WidgetTabsEnum } from '@/utils/enums'

interface WidgetState {
    activeTab: WidgetTabsEnum
    activeList: IList | null
    isAboutOpened: boolean
    isCategoriesOpened: boolean
    isMenuOpened: boolean
    isPlacesOpened: boolean
    selectedCategories: number[]
}

export const initialState: WidgetState = {
    activeTab: WidgetTabsEnum.ALL,
    activeList: null,
    isAboutOpened: false,
    isCategoriesOpened: false,
    isMenuOpened: false,
    isPlacesOpened: true,
    selectedCategories: [],
}

export const widgetSlice = createSlice({
    name: 'widget',
    initialState,
    reducers: {
        resetWidgetState() {
            return initialState
        },
        closeWidget(state) {
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

export const {
    resetWidgetState,
    closeWidget,
    toggleWidgetPlacesOpened,
    toggleWidgetCategoriesOpened,
    toggleWidgetAbout,
    toggleWidgetMenu,
    setWidgetSelectedCategories,
    setWidgetActiveTab,
    setWidgetActiveList,
    resetWidgetActiveList,
} = widgetSlice.actions

export default widgetSlice.reducer
