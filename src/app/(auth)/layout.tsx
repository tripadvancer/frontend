import { ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
    robots: 'noindex, nofollow',
}

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex-center min-h-screen bg-blue-20 p-4 sm:p-16">
            <div className="box-content flex w-104 flex-col items-center gap-y-8 rounded-2xl bg-white px-8 py-16 sm:p-16">
                <Link href="/" className="flex gap-x-2">
                    <Image
                        src="/images/logo-mini.svg"
                        width="32"
                        height="28"
                        alt="Tripadvancer"
                        className="hidden sm:block"
                    />
                    <Image
                        src="/images/logo.svg"
                        width="144"
                        height="24"
                        alt="Tripadvancer"
                        className="sm:h-[28px] sm:w-[168px]"
                    />
                </Link>
                {children}
            </div>
        </div>
    )
}
