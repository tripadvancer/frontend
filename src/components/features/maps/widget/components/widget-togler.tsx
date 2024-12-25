'use client'

import { SearchIcon } from 'lucide-react'

import { FormButton } from '@/components/ui/form-button'
import { RandomIcon24 } from '@/components/ui/icons'
import { getWidgetMode, setWidgetMode } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetModes } from '@/utils/enums'

export const WidgetTogler = () => {
    const dispatch = useAppDispatch()
    const widgetMode = useAppSelector(getWidgetMode)

    const buttonProps = {
        [WidgetModes.PLACES]: {
            variant: 'orange' as 'blue' | 'orange',
            icon: <RandomIcon24 />,
            onClick: () => dispatch(setWidgetMode(WidgetModes.RANDOM)),
        },
        [WidgetModes.RANDOM]: {
            variant: 'blue' as 'blue' | 'orange',
            icon: <SearchIcon />,
            onClick: () => dispatch(setWidgetMode(WidgetModes.PLACES)),
        },
    }

    return <FormButton {...buttonProps[widgetMode]} />
}
