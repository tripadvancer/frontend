'use client'

import { Categories } from '@/components/ui/categories'
import {
    getWidgetIsCategoriesOpened,
    getWidgetSelectedCategories,
    setWidgetSelectedCategories,
    toggleWidgetCategories,
} from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetSection } from './widget-section'

type WidgetCategoriesProps = {
    variant: 'blue' | 'orange'
}

export const WidgetCategories = ({ variant }: WidgetCategoriesProps) => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const isCategoriesOpened = useAppSelector(getWidgetIsCategoriesOpened)
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)

    return (
        <WidgetSection
            title={t('widget.categories.title')}
            variant={variant}
            info={
                selectedCategories.length > 0 ? t('widget.categories', { count: selectedCategories.length }) : undefined
            }
            isExpanded={isCategoriesOpened}
            onToggle={() => dispatch(toggleWidgetCategories())}
        >
            <Categories
                variant={variant}
                selectedCategories={selectedCategories}
                onClick={selectedCategories => dispatch(setWidgetSelectedCategories(selectedCategories))}
            />
        </WidgetSection>
    )
}
