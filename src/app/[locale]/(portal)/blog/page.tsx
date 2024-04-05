import type { Metadata } from 'next/types'

import { Blog } from '@/components/features/blog/blog'
import { getStaticParams } from '@/utils/i18n/i18n.server'
import { setStaticParamsLocale } from 'next-international/server'

export const metadata: Metadata = {
    title: 'Blog',
    alternates: {
        canonical: 'blog',
    },
}

export function generateStaticParams() {
    return getStaticParams()
}

export default function BlogPage({ params }: { params: { locale: string } }) {
    setStaticParamsLocale(params.locale)
    return <Blog />
}
