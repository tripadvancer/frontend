'use client'

import { FormButton } from '@/components/ui/form-button'
import { RandomIcon24, SearchIcon24 } from '@/components/ui/icons'
import { getWidgetMode, setWidgetMode } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetModes } from '@/utils/enums'

export const WidgetTogler = () => {
    const dispatch = useAppDispatch()
    const widgetMode = useAppSelector(getWidgetMode)

    const buttonProps = {
        [WidgetModes.PLACES]: {
            variant: 'blue',
            icon: <SearchIcon24 />,
            onClick: () => dispatch(setWidgetMode(WidgetModes.PLACES)),
        },
        [WidgetModes.RANDOM]: {
            variant: 'orange',
            icon: <RandomIcon24 />,
            onClick: () => dispatch(setWidgetMode(WidgetModes.RANDOM)),
        },
    }

    return (
        <FormButton
            variant={buttonProps[widgetMode].variant as 'blue' | 'orange'}
            icon={buttonProps[widgetMode].icon}
            onClick={buttonProps[widgetMode].onClick}
        />
    )
}
