'use client'

import { useState } from 'react'

import classNames from 'classnames'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Categories } from '@/components/ui/categories'
import { getWidgetSelectedCategories, setWidgetSelectedCategories } from '@/utils/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'

type WidgetCategoriesProps = {
    variant: 'blue' | 'orange'
}

export const WidgetCategories = ({ variant }: WidgetCategoriesProps) => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)

    const [isOpened, setIsOpened] = useState<boolean>(false)

    const colorVariants = {
        blue: 'text-blue-100',
        orange: 'text-orange-100',
    }

    const info =
        selectedCategories.length > 0
            ? t('map.widget.categories.selected', { count: selectedCategories.length })
            : undefined

    const handleCategoriesClick = (selectedCategories: number[]) => {
        dispatch(setWidgetSelectedCategories(selectedCategories))
    }

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex cursor-pointer items-center justify-between" onClick={() => setIsOpened(!isOpened)}>
                <div className="text-caps uppercase">{t('map.widget.categories.title')}</div>
                <div className="flex items-center justify-center gap-2">
                    {info && <span className={classNames('text-small', colorVariants[variant])}>{info}</span>}
                    {isOpened ? (
                        <ChevronUpIcon size={16} absoluteStrokeWidth />
                    ) : (
                        <ChevronDownIcon size={16} absoluteStrokeWidth />
                    )}
                </div>
            </div>

            {isOpened && (
                <Categories variant={variant} selectedCategories={selectedCategories} onClick={handleCategoriesClick} />
            )}
        </div>
    )
}
