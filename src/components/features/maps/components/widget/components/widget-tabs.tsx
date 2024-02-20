'use client'

import classNames from 'classnames'

import { FormSwitcher } from '@/components/ui/form-switcher'
import {
    getShowOnlySavedPlaces,
    getWidgetActiveTab,
    setWidgetActiveTab,
    toggleShowOnlySavedPlaces,
} from '@/redux/features/map-slice'
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
    const activeTab = useAppSelector(getWidgetActiveTab)
    const showOnlySavedPlaces = useAppSelector(getShowOnlySavedPlaces)

    const tabs: TabType[] = [
        { id: WidgetTabsEnum.ALL, caption: t('widget.all_places.title') },
        { id: WidgetTabsEnum.SAVED, caption: t('widget.saved_places.title') },
    ]

    return (
        <div className="flex items-center justify-between">
            <ul className="flex gap-x-4">
                {tabs.map(tab => (
                    <li
                        key={tab.id}
                        className={classNames(
                            'hover-animated cursor-pointer text-big-bold text-blue-100 hover:text-blue-active',
                            {
                                'border-b-2 border-black-100 !text-black-100': activeTab === tab.id,
                            },
                        )}
                        onClick={() => dispatch(setWidgetActiveTab(tab.id))}
                    >
                        {tab.caption}
                    </li>
                ))}
            </ul>

            {activeTab === WidgetTabsEnum.SAVED && (
                <div className="flex items-center gap-x-2">
                    <div onClick={() => dispatch(toggleShowOnlySavedPlaces())} className="cursor-pointer">
                        {t('widget.saved_places.show_on_the_map')}
                    </div>
                    <FormSwitcher
                        checked={showOnlySavedPlaces}
                        onChange={() => dispatch(toggleShowOnlySavedPlaces())}
                    />
                </div>
            )}
        </div>
    )
}
