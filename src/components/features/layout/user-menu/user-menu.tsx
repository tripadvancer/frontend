'use client'

import { RefObject, useRef, useState } from 'react'

import { CircleUserIcon, LogOutIcon, SettingsIcon } from 'lucide-react'
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts'

import Link from 'next/link'

import { useToast } from '@/components/providers/toast-provider'
import { Avatar } from '@/components/ui/avatar'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'
import { useSignOut } from '@/utils/hooks/use-sign-out'

type UserMenuProps = {
    name: string
    avatar: string | null
    avatarSize?: number
}

export const UserMenu = ({ name, avatar, avatarSize }: UserMenuProps) => {
    const toast = useToast()
    const signOut = useSignOut()
    const isMobile = useMediaQuery('(max-width: 639px)')

    const ref = useRef<HTMLDivElement>(null)

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    // TODO: Consider switching to a different package or waiting for a fix
    // Issue: `useOnClickOutside` does not support a `null` ref
    // More details: https://github.com/juliencrn/usehooks-ts/issues/663
    useOnClickOutside(ref as RefObject<HTMLDivElement>, () => {
        setIsMenuOpen(false)
    })

    useKeypress(Keys.ESCAPE, () => {
        setIsMenuOpen(false)
    })

    const handleSignOut = async () => {
        try {
            setIsMenuOpen(false)
            await signOut()
        } catch {
            toast.error(UNEXPECTED_ERROR_MESSAGE)
        }
    }

    return (
        <div className="relative" ref={ref}>
            <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer">
                <Avatar name={name} avatar={avatar} size={avatarSize ? avatarSize : isMobile ? 24 : 32} />
            </div>

            {isMenuOpen && (
                <menu className="shadow-medium absolute top-full right-0 z-20 mt-1 min-w-40 rounded-lg bg-white p-1.5">
                    <li>
                        <Link
                            href={`/users/${name.toLowerCase()}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="hover:bg-blue-10 flex items-center gap-x-2 rounded p-1.5 text-nowrap text-blue-100 transition-none"
                        >
                            <CircleUserIcon size={16} />
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/users/${name.toLowerCase()}/settings`}
                            onClick={() => setIsMenuOpen(false)}
                            className="hover:bg-blue-10 flex items-center gap-x-2 rounded p-1.5 text-nowrap text-blue-100 transition-none"
                        >
                            <SettingsIcon size={16} />
                            Settings
                        </Link>
                    </li>
                    <li>
                        <div
                            className="hover:bg-blue-10 flex cursor-pointer items-center gap-x-2 rounded p-1.5 text-nowrap text-red-100"
                            onClick={handleSignOut}
                        >
                            <LogOutIcon size={16} />
                            Log out
                        </div>
                    </li>
                </menu>
            )}
        </div>
    )
}
