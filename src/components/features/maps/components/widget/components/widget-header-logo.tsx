'use client'

import Image from 'next/image'
import Link from 'next/link'

export const WidgetHeaderLogo = () => {
    return (
        <Link href="/">
            <Image src="/images/logo.svg" width="140" height="24" alt="Tripadvancer" />
        </Link>
    )
}
