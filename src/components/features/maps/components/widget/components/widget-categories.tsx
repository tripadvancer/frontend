'use client'

import { Categories } from '@/components/ui/categories'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetSection } from './widget-section'

type WidgetCategoriesProps = {
    variant: 'blue' | 'orange'
    selectedCategories: number[]
    onChange: (selectedCategories: number[]) => void
}

export const WidgetCategories = ({ variant, selectedCategories, onChange }: WidgetCategoriesProps) => {
    const t = useI18n()

    return (
        <WidgetSection
            title={t('widget.categories.title')}
            variant={variant}
            info={
                selectedCategories.length > 0
                    ? t('widget.categories.selected', { count: selectedCategories.length })
                    : undefined
            }
        >
            <Categories variant={variant} selectedCategories={selectedCategories} onClick={onChange} />
        </WidgetSection>
    )
}
