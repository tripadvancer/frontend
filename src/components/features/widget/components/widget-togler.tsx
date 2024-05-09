'use client'

import { FormButton } from '@/components/ui/form-button'
import { RandomIcon24, SearchIcon24 } from '@/components/ui/icons'
import { getWidgetActiveSide, setWidgetActiveSide } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetSideEnum } from '@/utils/enums'

export const WidgetTogler = () => {
    const dispatch = useAppDispatch()
    const widgetActiveSide = useAppSelector(getWidgetActiveSide)
    const isRandom = widgetActiveSide === WidgetSideEnum.RANDOM

    const handleClick = () => {
        dispatch(
            setWidgetActiveSide(
                widgetActiveSide === WidgetSideEnum.PLACES ? WidgetSideEnum.RANDOM : WidgetSideEnum.PLACES,
            ),
        )
    }

    return (
        <FormButton
            variant={isRandom ? 'blue' : 'orange'}
            icon={isRandom ? <SearchIcon24 /> : <RandomIcon24 />}
            onClick={handleClick}
        />
    )
}
