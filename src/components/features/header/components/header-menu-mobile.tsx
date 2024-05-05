'use client'

import { getIsHeaderMenuOpened } from '@/redux/features/app-slice'
import { useAppSelector } from '@/redux/hooks'

import { HeaderMenu } from './header-menu'

export const HeaderMenuMobile = () => {
    const isHeaderMenuOpened = useAppSelector(getIsHeaderMenuOpened)

    if (!isHeaderMenuOpened) {
        return null
    }

    return (
        <div className="container block pb-6 pt-2 sm:hidden">
            <nav className="flex flex-col gap-y-2">
                <HeaderMenu />
            </nav>
        </div>
    )
}
