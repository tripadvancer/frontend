'use client'

import classNames from 'classnames'

import { closeMapPopups } from '@/redux/features/map-slice'
import { getWidgetState, setWidgetActiveTab } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetTabsEnum } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'

type TabType = {
    id: WidgetTabsEnum
    caption: string
}

export const WidgetTabs = () => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    const tabs: TabType[] = [
        { id: WidgetTabsEnum.ALL, caption: t('widget.tabs.all') },
        { id: WidgetTabsEnum.SAVED, caption: t('widget.tabs.saved') },
        { id: WidgetTabsEnum.RANDOM, caption: t('widget.tabs.random') },
    ]

    const handleTabClick = (tab: TabType) => {
        dispatch(setWidgetActiveTab(tab.id))
        dispatch(closeMapPopups())
    }

    return (
        <ul className="flex gap-x-4">
            {tabs.map(tab => (
                <li
                    key={tab.id}
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
