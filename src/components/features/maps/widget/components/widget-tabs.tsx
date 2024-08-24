'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'

import { getWidgetState, setWidgetActiveTab } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetTabs as WidgetTabsEnum } from '@/utils/enums'

type TabType = {
    id: WidgetTabsEnum
    caption: string
}

export const WidgetTabs = () => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    const tabs: TabType[] = [
        { id: WidgetTabsEnum.ALL, caption: t('map.widget.tabs.allPlaces.title') },
        { id: WidgetTabsEnum.SAVED, caption: t('map.widget.tabs.savedPlaces.title') },
    ]

    const handleTabClick = (tab: TabType) => {
        dispatch(setWidgetActiveTab(tab.id))
    }

    return (
        <ul className="flex gap-x-4">
            {tabs.map(tab => (
                <li
                    key={`widget-tab-${tab.id}`}
                    className={classNames(
                        'hover-animated cursor-pointer text-big-bold text-blue-100 hover:text-blue-active',
                        {
                            'border-b-2 border-black-100 !text-black-100': widgetState.activeTab === tab.id,
                        },
                    )}
                    onClick={() => handleTabClick(tab)}
                >
                    {tab.caption}
                </li>
            ))}
        </ul>
    )
}
