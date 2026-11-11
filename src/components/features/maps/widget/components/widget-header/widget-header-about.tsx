'use client'

import Link from 'next/link'

import { getWidgetState } from '@/utils/redux/features/widget-slice'
import { useAppSelector } from '@/utils/redux/hooks'

export const WidgetHeaderAbout = () => {
    const widgetState = useAppSelector(getWidgetState)

    if (widgetState.isAboutOpened) {
        return (
            <div className="flex flex-col gap-y-4 px-4 pb-8 pt-4 sm:px-8 sm:pt-0">
                <div className="flex flex-col gap-y-2">
                    <p>{'Planing a trip but don`t know where to go?'}</p>
                    <p>
                        {
                            'Tripadvancer will help you discover the world in a new way, find interesting places and go on an amazing trip.'
                        }
                    </p>
                </div>
                <ul className="flex flex-col gap-y-2">
                    <li>
                        <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>{'Contact Us'}</Link>
                    </li>
                    <li>
                        <Link href="https://help.tripadvancer.com" target="_blank">
                            {'Help Center'}
                        </Link>
                    </li>
                    <li>
                        <Link href="/legal/terms-and-conditions" target="_blank">
                            {'Terms and Conditions'}
                        </Link>
                    </li>
                    <li>
                        <Link href="/legal/privacy-policy" target="_blank">
                            {'Privacy Policy'}
                        </Link>
                    </li>
                    <li>
                        <Link href="/legal/cookie-policy" target="_blank">
                            {'Cookie Policy'}
                        </Link>
                    </li>
                </ul>
                <p className="text-black-70">{'© Tripadvancer, 2026'}</p>
            </div>
        )
    }

    return null
}
