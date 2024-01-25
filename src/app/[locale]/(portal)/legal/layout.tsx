import { ReactNode } from 'react'

import { setStaticParamsLocale } from 'next-international/server'

import { getStaticParams } from '@/utils/i18n/i18n.server'

export function generateStaticParams() {
    return getStaticParams()
}

export default function LegalLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
    setStaticParamsLocale(params.locale)
    return <div className="container py-24">{children}</div>
}
