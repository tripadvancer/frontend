'use client'

import { ArrowLeftIcon16 } from '@/components/ui/icons'
import { closeMapPopups } from '@/redux/features/map-slice'
import { resetWidgetPLacesActiveList } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'

type WidgetPlacesSavedListProps = {
    children: React.ReactNode
    caption: string
}

export const WidgetPlacesSavedList = ({ children, caption }: WidgetPlacesSavedListProps) => {
    const dispatch = useAppDispatch()

    const handleBackClick = () => {
        dispatch(resetWidgetPLacesActiveList())
        dispatch(closeMapPopups())
    }

    return (
        <div className="flex flex-col gap-y-4 sm:gap-y-8">
            <div
                className="hover-animated flex cursor-pointer items-center gap-x-2 text-big-bold hover:text-blue-active"
                onClick={handleBackClick}
            >
                <ArrowLeftIcon16 />
                {caption}
            </div>
            {children}
        </div>
    )
}
