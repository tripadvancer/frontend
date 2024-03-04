'use client'

import { Categories } from '@/components/ui/categories'
import {
    getWidgetState,
    setWidgetRandomSelectedCategories,
    toggleWidgetRandomCategoryFilterOpened,
} from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetSection } from './widget-section'

export const WidgetRandomCategories = () => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)
    const selectedCategories = widgetState.random.selectedCategories

    return (
        <WidgetSection
            title={t('widget.categories.title')}
            variant="orange"
            info={
                selectedCategories.length > 0
                    ? t('widget.categories.selected', { count: selectedCategories.length })
                    : undefined
            }
            isOpened={widgetState.random.isCategoryFilterOpened}
            onToggle={() => dispatch(toggleWidgetRandomCategoryFilterOpened())}
        >
            <Categories
                variant="orange"
                selectedCategories={selectedCategories}
                onClick={selectedCategories => dispatch(setWidgetRandomSelectedCategories(selectedCategories))}
            />
        </WidgetSection>
    )
}
