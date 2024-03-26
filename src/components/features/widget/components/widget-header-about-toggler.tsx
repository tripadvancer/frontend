'use client'

import { CloseIcon24, MenuIcon24 } from '@/components/ui/icons'
import { getWidgetState, toggleWidgetAbout } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const WidgetHeaderAboutToggler = () => {
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    return (
        <div className="cursor-pointer" onClick={() => dispatch(toggleWidgetAbout())}>
            {widgetState.isAboutOpened ? <CloseIcon24 /> : <MenuIcon24 />}
        </div>
    )
}
