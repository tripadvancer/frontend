'use client'

import { CloseIcon24, MenuIcon24 } from '@/components/ui/icons'
import { getIsHeaderMenuOpened, toggleHeaderMenu } from '@/redux/features/app-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const HeaderMenuToggler = () => {
    const isHeaderMenuOpened = useAppSelector(getIsHeaderMenuOpened)
    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(toggleHeaderMenu())
    }

    return (
        <div className="link-black block cursor-pointer sm:hidden" onClick={handleClick}>
            {isHeaderMenuOpened ? <CloseIcon24 /> : <MenuIcon24 />}
        </div>
    )
}
