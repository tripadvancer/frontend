'use client'

import { RefObject, useRef, useState } from 'react'

import { CircleUserIcon, LogOutIcon, SettingsIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Session from 'supertokens-web-js/recipe/session'
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Avatar } from '@/components/ui/avatar'
import { useToast } from '@/providers/toast-provider'
import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'

type UserMenuProps = {
    name: string
    avatar: string | null
    avatarSize?: number
}

export const UserMenu = ({ name, avatar, avatarSize }: UserMenuProps) => {
    const t = useTranslations()
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
            toast.error(t('common.error'))
        }
    }

    return (
        <div className="relative" ref={ref}>
            <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer">
                <Avatar name={name} avatar={avatar} size={avatarSize ? avatarSize : isMobile ? 24 : 32} />
            </div>

            {isMenuOpen && (
                <menu className="absolute right-0 top-full z-20 mt-1 min-w-40 rounded-lg bg-white p-1.5 shadow-medium">
                    <li>
                        <Link
                            href={`/users/${name.toLowerCase()}`}
                            scroll={false}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-x-2 text-nowrap rounded p-1.5 text-blue-100 transition-none hover:bg-blue-10"
                        >
                            <CircleUserIcon size={16} />
                            {t('layout.userMenu.profile')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/users/${name.toLowerCase()}/settings`}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-x-2 text-nowrap rounded p-1.5 text-blue-100 transition-none hover:bg-blue-10"
                        >
                            <SettingsIcon size={16} />
                            {t('layout.userMenu.settings')}
                        </Link>
                    </li>
                    <li>
                        <div
                            className="flex cursor-pointer items-center gap-x-2 text-nowrap rounded p-1.5 text-red-100 hover:bg-blue-10"
                            onClick={signOut}
                        >
                            <LogOutIcon size={16} />
                            {t('layout.userMenu.logOut')}
                        </div>
                    </li>
                </menu>
            )}
        </div>
    )
}
