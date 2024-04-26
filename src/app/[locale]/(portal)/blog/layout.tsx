import { ReactNode } from 'react'

import { setStaticParamsLocale } from 'next-international/server'

import type { Metadata } from 'next/types'

import { Blog } from '@/components/features/blog/blog'
import { getStaticParams } from '@/utils/i18n/i18n.server'

export const metadata: Metadata = {
    title: 'Blog',
    alternates: {
        canonical: 'blog',
    },
}

export function generateStaticParams() {
    return getStaticParams()
}

export default function BlogLayout({ params, children }: { params: { locale: string }; children: ReactNode }) {
    setStaticParamsLocale(params.locale)
    return <Blog>{children}</Blog>
}
