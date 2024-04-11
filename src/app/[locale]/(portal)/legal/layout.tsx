import { ReactNode } from 'react'

import { setStaticParamsLocale } from 'next-international/server'

import type { Metadata } from 'next/types'

import { getStaticParams } from '@/utils/i18n/i18n.server'

export const metadata: Metadata = {
    robots: 'noindex, nofollow',
}

export function generateStaticParams() {
    return getStaticParams()
}

export default function LegalLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
    setStaticParamsLocale(params.locale)
    return <div className="container py-24">{children}</div>
}
