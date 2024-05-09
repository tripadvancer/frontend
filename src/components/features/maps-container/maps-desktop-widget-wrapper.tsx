import { ReactNode } from 'react'

export const MapsDesktopWidgetWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="scrollbar-hide fixed right-0 top-0 z-40 max-h-full w-[496px] overflow-y-auto overscroll-y-none pb-8 pl-8 pr-4 pt-4">
            <div className="overflow-hidden rounded-2xl shadow-large">{children}</div>
        </div>
    )
}
