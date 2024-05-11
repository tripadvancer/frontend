'use client'

import { FormButton } from '@/components/ui/form-button'
import { RandomIcon24, SearchIcon24 } from '@/components/ui/icons'
import { getWidgetMode, setWidgetMode } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetMode } from '@/utils/enums'

export const WidgetTogler = () => {
    const dispatch = useAppDispatch()
    const widgetMode = useAppSelector(getWidgetMode)

    if (widgetMode === WidgetMode.PLACES) {
        return (
            <FormButton
                variant="orange"
                icon={<RandomIcon24 />}
                onClick={() => {
                    dispatch(setWidgetMode(WidgetMode.RANDOM))
                }}
            />
        )
    }

    return (
        <FormButton
            variant="blue"
            icon={<SearchIcon24 />}
            onClick={() => {
                dispatch(setWidgetMode(WidgetMode.PLACES))
            }}
        />
    )
}
