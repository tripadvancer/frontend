'use client'

import { Categories } from '@/components/ui/categories'
import { ChevronBottomIcon16, ChevronTopIcon16 } from '@/components/ui/icons'
import { closeMapPopups } from '@/redux/features/map-slice'
import {
    getWidgetState,
    setWidgetSelectedCategories,
    toggleWidgetCategoriesOpened,
} from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

export const WidgetCategories = () => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)
    const selectedCategories = widgetState.selectedCategories
    const info =
        selectedCategories.length > 0
            ? t('widget.categories.selected', { count: selectedCategories.length })
            : undefined

    const handleCategoriesClick = (selectedCategories: number[]) => {
        dispatch(setWidgetSelectedCategories(selectedCategories))
        dispatch(closeMapPopups())
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => dispatch(toggleWidgetCategoriesOpened())}
            >
                <div className="text-caps uppercase">{t('widget.categories.title')}</div>
                <div className="flex items-center justify-center gap-2">
                    {info && <span className="text-small text-blue-100">{info}</span>}
                    {widgetState.isCategoriesOpened ? <ChevronTopIcon16 /> : <ChevronBottomIcon16 />}
                </div>
            </div>

            {widgetState.isCategoriesOpened && (
                <Categories variant="blue" selectedCategories={selectedCategories} onClick={handleCategoriesClick} />
            )}
        </div>
    )
}
