'use client'

import { getWidgetIsAboutOpened, toggleWidgetAbout } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const WidgetHeaderAboutToggler = () => {
    const dispatch = useAppDispatch()
    const isAboutOpened = useAppSelector(getWidgetIsAboutOpened)

    return (
        <div className="cursor-pointer" onClick={() => dispatch(toggleWidgetAbout())}>
            {isAboutOpened ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4545 12L20 18.5455L18.5455 20L12 13.4545L5.45455 20L4 18.5455L10.5455 12L4 5.45455L5.45455 4L12 10.5455L18.5455 4L20 5.45455L13.4545 12Z" />
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 7V5H2V7H22Z" />
                    <path d="M22 11V13H2V11H22Z" />
                    <path d="M22 17V19H2V17H22Z" />
                </svg>
            )}
        </div>
    )
}
