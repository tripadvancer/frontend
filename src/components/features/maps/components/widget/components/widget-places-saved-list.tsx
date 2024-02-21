'use client'

import { ArrowLeftIcon16 } from '@/components/ui/icons'
import { resetWidgetActiveList } from '@/redux/features/map-slice'
import { useAppDispatch } from '@/redux/hooks'

type WidgetPlacesSavedListProps = {
    children: React.ReactNode
    caption: string
}

export const WidgetPlacesSavedList = ({ children, caption }: WidgetPlacesSavedListProps) => {
    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-col gap-y-4 sm:gap-y-8">
            <div
                className="hover-animated flex cursor-pointer items-center gap-x-2 text-big-bold hover:text-blue-active"
                onClick={() => dispatch(resetWidgetActiveList())}
            >
                <ArrowLeftIcon16 />
                {caption}
            </div>
            {children}
        </div>
    )
}
