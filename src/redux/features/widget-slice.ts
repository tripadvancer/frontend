import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/redux/store'
import { WidgetModes, WidgetTabs } from '@/utils/enums'
import { IList } from '@/utils/types/common'

interface WidgetState {
    mode: WidgetModes
    activeTab: WidgetTabs
    activeList: IList | null
    randomRadius: number
    isAboutOpened: boolean
    selectedCategories: number[]
}

export const initialState: WidgetState = {
    mode: WidgetModes.PLACES,
    activeTab: WidgetTabs.ALL,
    activeList: null,
    randomRadius: 15,
    isAboutOpened: false,
    selectedCategories: [],
}

export const widgetSlice = createSlice({
    name: 'widget',
    initialState,
    reducers: {
        setWidgetMode(state, action: PayloadAction<WidgetModes>) {
            state.mode = action.payload
        },
        setWidgetActiveTab(state, action: PayloadAction<WidgetTabs>) {
            state.activeTab = action.payload
        },
        setWidgetActiveList(state, action: PayloadAction<IList | null>) {
            state.activeList = action.payload
        },
        setWidgetRandomRadius(state, action: PayloadAction<number>) {
            state.randomRadius = action.payload
        },
        toggleWidgetAbout(state) {
            state.isAboutOpened = !state.isAboutOpened
        },
        setWidgetSelectedCategories(state, action: PayloadAction<number[]>) {
            state.selectedCategories = action.payload
        },
    },
})

export const getWidgetState = (state: RootState) => state.widget
export const getWidgetMode = (state: RootState) => state.widget.mode
export const getWidgetActiveTab = (state: RootState) => state.widget.activeTab
export const getWidgetActiveList = (state: RootState) => state.widget.activeList
export const getWidgetRandomRadius = (state: RootState) => state.widget.randomRadius
export const getWidgetSelectedCategories = (state: RootState) => state.widget.selectedCategories

export const {
    setWidgetMode,
    setWidgetActiveTab,
    setWidgetActiveList,
    setWidgetRandomRadius,
    toggleWidgetAbout,
    setWidgetSelectedCategories,
} = widgetSlice.actions

export default widgetSlice.reducer
