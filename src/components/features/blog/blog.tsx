import { ReactNode } from 'react'

import { getCurrentLocale, getI18n } from '@/utils/i18n/i18n.server'

import { BlogNav } from './components/blog-nav'

export const Blog = async ({ children }: { children: ReactNode }) => {
    const t = await getI18n()
    const locale = getCurrentLocale()

    return (
        <section className="container py-24">
            <div className="mb-16">
                <h1 className="h1 mb-8 text-center">Company blog</h1>
                <BlogNav />
            </div>
            {children}
            {/* <FeedArticles /> */}
        </section>
    )
}
