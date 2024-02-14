'use client'

import Image from 'next/image'
import Link from 'next/link'

import type { IUserInfo } from '@/utils/types/user'

import { getWidgetIsAboutOpened, toggleWidgetAbout } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

import { WidgetHeaderUser } from './widget-header-user'

type WidgetHeaderProps = {
    userInfo: IUserInfo | null
}

export const WidgetHeader = ({ userInfo }: WidgetHeaderProps) => {
    const dispatch = useAppDispatch()
    const isAboutOpened = useAppSelector(getWidgetIsAboutOpened)

    return (
        <div className="flex items-center justify-between p-4 sm:p-8">
            <div className="flex gap-x-4">
                <div className="cursor-pointer" onClick={() => dispatch(toggleWidgetAbout())}>
                    {isAboutOpened ? (
                        // prettier-ignore
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M13.4545 12L20 18.5455L18.5455 20L12 13.4545L5.45455 20L4 18.5455L10.5455 12L4 5.45455L5.45455 4L12 10.5455L18.5455 4L20 5.45455L13.4545 12Z" />
                        </svg>
                    ) : (
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M22 7V5H2V7H22Z" />
                            <path d="M22 11V13H2V11H22Z" />
                            <path d="M22 17V19H2V17H22Z" />
                        </svg>
                    )}
                </div>

                <Link href="/">
                    <Image src="/images/logo.svg" width="140" height="24" alt="Tripadvancer" />
                </Link>
            </div>

            <WidgetHeaderUser userInfo={userInfo} />
        </div>
    )
}
