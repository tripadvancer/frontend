'use client'

import { FilterIcon, FilterXIcon } from 'lucide-react'

import { SavedListView } from '@/components/features/common/saved/saved-list-view'
import { DropdownItemProps } from '@/components/ui/dropdown'
import { getIsFilterMapBySavedLists, setIsFilterMapBySavedLists } from '@/utils/redux/features/map-slice'
import { getWidgetSelectedCategories, setWidgetActiveList } from '@/utils/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'
import { IList } from '@/utils/types/common'

export const WidgetSavedListsView = ({ list }: { list: IList }) => {
    const isFilterMapBySavedLists = useAppSelector(getIsFilterMapBySavedLists)
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)
    const dispatch = useAppDispatch()

    const actions: DropdownItemProps[] = [
        {
            caption: isFilterMapBySavedLists ? 'Show all places' : 'Hide other places',
            value: 'preview_mode',
            icon: isFilterMapBySavedLists ? <FilterXIcon size={16} /> : <FilterIcon size={16} />,
            onClick: () => dispatch(setIsFilterMapBySavedLists(!isFilterMapBySavedLists)),
        },
    ]

    return (
        <SavedListView
            list={list}
            onBack={() => dispatch(setWidgetActiveList(null))}
            actions={actions}
            selectedCategories={selectedCategories}
        />
    )
}
