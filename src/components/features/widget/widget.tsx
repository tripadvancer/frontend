'use client'

import { getWidgetState, setWidgetSide } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetSide } from '@/utils/enums'

import { WidgetPlaces } from './widget-places'
import { WidgetRandom } from './widget-random'

export const Widget = () => {
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    return (
        <div className="fixed right-0 top-0 z-40 w-full sm:w-[512px]">
            {widgetState.widgetSide === WidgetSide.PLACES && (
                <WidgetPlaces onFlip={() => dispatch(setWidgetSide(WidgetSide.RANDOM))} />
            )}
            {widgetState.widgetSide === WidgetSide.RANDOM && (
                <WidgetRandom onFlip={() => dispatch(setWidgetSide(WidgetSide.PLACES))} />
            )}
        </div>
    )
}
