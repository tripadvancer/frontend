'use client'

import { useState } from 'react'

import classNames from 'classnames'

import { Categories } from '@/components/ui/categories'
import { ChevronBottomIcon16, ChevronTopIcon16 } from '@/components/ui/icons'
import { closeMapPopups } from '@/redux/features/map-slice'
import { getWidgetSelectedCategories, setWidgetSelectedCategories } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

type WidgetCategoriesProps = {
    variant: 'blue' | 'orange'
}

export const WidgetCategories = ({ variant }: WidgetCategoriesProps) => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)

    const [isOpened, setIsOpened] = useState<boolean>(false)

    const colorVariants = {
        blue: 'text-blue-100',
        orange: 'text-orange-100',
    }

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
            <div className="flex cursor-pointer items-center justify-between" onClick={() => setIsOpened(!isOpened)}>
                <div className="text-caps uppercase">{t('widget.categories.title')}</div>
                <div className="flex items-center justify-center gap-2">
                    {info && <span className={classNames('text-small', colorVariants[variant])}>{info}</span>}
                    {isOpened ? <ChevronTopIcon16 /> : <ChevronBottomIcon16 />}
                </div>
            </div>

            {isOpened && (
                <Categories variant={variant} selectedCategories={selectedCategories} onClick={handleCategoriesClick} />
            )}
        </div>
    )
}
