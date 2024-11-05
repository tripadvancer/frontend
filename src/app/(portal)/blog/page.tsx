import { Metadata } from 'next/types'

import { Blog } from '@/components/features/pages/blog/blog'

export const metadata: Metadata = {
    title: 'Blog',
    alternates: {
        canonical: 'blog',
    },
}

export default function BlogPage() {
    return <Blog />
}
