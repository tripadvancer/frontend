'use client'

import { FormButton } from '@/components/ui/form-button'
import { RandomIcon24, SearchIcon24 } from '@/components/ui/icons'
import { getWidgetMode, setWidgetMode } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetModes } from '@/utils/enums'
import { useMapRoute } from '@/utils/hooks/use-map-route'

export const WidgetTogler = () => {
    const dispatch = useAppDispatch()
    const widgetMode = useAppSelector(getWidgetMode)

    const { clearRoute } = useMapRoute()

    const buttonProps = {
        [WidgetModes.PLACES]: {
            variant: 'orange' as 'blue' | 'orange',
            icon: <RandomIcon24 />,
            onClick: () => {
                dispatch(setWidgetMode(WidgetModes.RANDOM))
                clearRoute()
            },
        },
        [WidgetModes.RANDOM]: {
            variant: 'blue' as 'blue' | 'orange',
            icon: <SearchIcon24 />,
            onClick: () => {
                dispatch(setWidgetMode(WidgetModes.PLACES))
                clearRoute()
            },
        },
    }

    return <FormButton {...buttonProps[widgetMode]} />
}
