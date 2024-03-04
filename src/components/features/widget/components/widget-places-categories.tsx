'use client'

import { Categories } from '@/components/ui/categories'
import { closeMapPopups } from '@/redux/features/map-slice'
import {
    getWidgetState,
    setWidgetPlacesSelectedCategories,
    toggleWidgetPlacesCategoryFilterOpened,
} from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetSection } from './widget-section'

export const WidgetPlacesCategories = () => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)
    const selectedCategories = widgetState.places.selectedCategories

    const handleCategoriesClick = (selectedCategories: number[]) => {
        dispatch(setWidgetPlacesSelectedCategories(selectedCategories))
        dispatch(closeMapPopups())
    }

    return (
        <WidgetSection
            title={t('widget.categories.title')}
            variant="blue"
            info={
                selectedCategories.length > 0
                    ? t('widget.categories.selected', { count: selectedCategories.length })
                    : undefined
            }
            isOpened={widgetState.places.isCategoryFilterOpened}
            onToggle={() => dispatch(toggleWidgetPlacesCategoryFilterOpened())}
        >
            <Categories variant="blue" selectedCategories={selectedCategories} onClick={handleCategoriesClick} />
        </WidgetSection>
    )
}
