'use client'

import { getWidgetActiveList, setWidgetActiveList } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetListsEnum } from '@/utils/enums'

import { WidgetPlacesSavedList } from './widget-places-saved-list'
import { WidgetPlacesSavedListFavorites } from './widget-places-saved-list-favorites'
import { WidgetPlacesSavedListVisited } from './widget-places-saved-list-visited'

export const WidgetPlacesSaved = () => {
    const dispatch = useAppDispatch()
    const activeList = useAppSelector(getWidgetActiveList)

    const defaultLists = [
        { id: WidgetListsEnum.FAVORITES, caption: 'Favorites' },
        { id: WidgetListsEnum.VISITED, caption: 'Visited places' },
    ]

    if (activeList === WidgetListsEnum.FAVORITES) {
        return (
            <WidgetPlacesSavedList caption="Favorites">
                <WidgetPlacesSavedListFavorites />
            </WidgetPlacesSavedList>
        )
    }

    if (activeList === WidgetListsEnum.VISITED) {
        return (
            <WidgetPlacesSavedList caption="Visited places">
                <WidgetPlacesSavedListVisited />
            </WidgetPlacesSavedList>
        )
    }

    const handleListClick = (listId: WidgetListsEnum) => {
        dispatch(setWidgetActiveList(listId))
    }

    return (
        <div className="flex flex-col gap-y-8">
            <div>
                {defaultLists.map(list => (
                    <div
                        key={`widget-list-${list.id}`}
                        className="hover-animated flex cursor-pointer items-center justify-between border-t border-blue-20 py-2 text-big-bold last:border-b hover:text-blue-active sm:py-4"
                        onClick={() => handleListClick(list.id)}
                    >
                        {list.caption}
                        {/* prettier-ignore */}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M9.99092 9.05132H2V6.94868H9.99092L6.54265 3.48679L8.02359 2L14 8L8.02359 14L6.54265 12.5132L9.99092 9.05132Z" />
                        </svg>
                    </div>
                ))}
            </div>
            <p className="text-center text-small text-black-40">Select a list to view your places.</p>
        </div>
    )
}
