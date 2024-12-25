'use client'

import { MenuIcon, XIcon } from 'lucide-react'

import { getWidgetState, toggleWidgetAbout } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const WidgetHeaderAboutToggler = () => {
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    return (
        <div
            className="hover-animated cursor-pointer hover:text-blue-active"
            onClick={() => dispatch(toggleWidgetAbout())}
        >
            {widgetState.isAboutOpened ? <XIcon /> : <MenuIcon />}
        </div>
    )
}
