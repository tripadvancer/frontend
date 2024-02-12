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
                {/* prettier-ignore */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.70069 6.94868H14V9.05132H5.70069L8.88371 12.5132L7.51668 14L2 8L7.51668 2L8.88371 3.48679L5.70069 6.94868Z" />
                </svg>
                {caption}
            </div>
            {children}
        </div>
    )
}
