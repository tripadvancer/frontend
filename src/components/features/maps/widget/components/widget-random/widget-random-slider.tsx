'use client'

import { InputRange } from '@/components/ui/range-slider'
import { getWidgetRandomRadius, setWidgetRandomRadius } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const WidgetRandomSlider = () => {
    const dispatch = useAppDispatch()
    const radius = useAppSelector(getWidgetRandomRadius)

    return (
        <InputRange
            value={radius}
            onChange={value => dispatch(setWidgetRandomRadius(value))}
            min={1}
            max={100}
            step={1}
        />
    )
}
