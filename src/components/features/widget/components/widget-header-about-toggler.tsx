'use client'

import { CloseIcon24, MenuIcon24 } from '@/components/ui/icons'
import { getWidgetIsAboutOpened, toggleWidgetAbout } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const WidgetHeaderAboutToggler = () => {
    const dispatch = useAppDispatch()
    const isAboutOpened = useAppSelector(getWidgetIsAboutOpened)

    return (
        <div className="cursor-pointer" onClick={() => dispatch(toggleWidgetAbout())}>
            {isAboutOpened ? <CloseIcon24 /> : <MenuIcon24 />}
        </div>
    )
}
