'use client'

import { RefObject, useRef, useState } from 'react'

import { CircleUserIcon, LogOutIcon, SettingsIcon } from 'lucide-react'
import Session from 'supertokens-web-js/recipe/session'
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useToast } from '@/components/providers/toast-provider'
import { Avatar } from '@/components/ui/avatar'
import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'

type UserMenuProps = {
    name: string
    avatar: string | null
    avatarSize?: number
}

export const UserMenu = ({ name, avatar, avatarSize }: UserMenuProps) => {
    const router = useRouter()
    const toast = useToast()
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

    const signOut = async () => {
        try {
            setIsMenuOpen(false)
            await Session.signOut()
            router.push('/')
            router.refresh()
        } catch (err) {
            toast.error('An unexpected error has occurred. Please try again later.')
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
                            onClick={signOut}
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
