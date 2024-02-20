'use client'

import { Categories } from '@/components/ui/categories'
import {
    getWidgetIsCategoriesOpened,
    getWidgetSelectedCategories,
    setWidgetSelectedCategories,
    toggleWidgetCategories,
} from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

import { WidgetSection } from './widget-section'

type WidgetCategoriesProps = {
    variant: 'blue' | 'orange'
}

export const WidgetCategories = ({ variant }: WidgetCategoriesProps) => {
    const dispatch = useAppDispatch()
    const isCategoriesOpened = useAppSelector(getWidgetIsCategoriesOpened)
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)

    return (
        <WidgetSection
            title="Categories"
            variant={variant}
            info={selectedCategories.length > 0 ? `${selectedCategories.length} selected` : undefined}
            isExpanded={isCategoriesOpened}
            onToggle={() => dispatch(toggleWidgetCategories())}
        >
            <Categories
                variant={variant}
                selectedCategories={selectedCategories}
                onClick={(selectedCategories: number[]) => dispatch(setWidgetSelectedCategories(selectedCategories))}
            />
        </WidgetSection>
    )
}
