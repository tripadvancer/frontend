'use client'

import { usePathname } from 'next/navigation'

import { BlogNavLink } from './blog-nav-link'

export const BlogNav = () => {
    const pathname = usePathname()

    const links = [
        { href: '/blog/faq', caption: 'FAQ' },
        { href: '/blog/travel-stories', caption: 'Travel Stories' },
        { href: '/blog/features', caption: 'Features' },
    ]

    return (
        <nav className="mx-auto flex flex-wrap justify-center gap-1 sm:w-2/3">
            <BlogNavLink href="/blog" isCurrent={pathname === '/blog'}>
                All
            </BlogNavLink>

            {links.map(link => (
                <BlogNavLink key={link.href} href={link.href} isCurrent={pathname.includes(link.href)}>
                    {link.caption}
                </BlogNavLink>
            ))}
        </nav>
    )
}
