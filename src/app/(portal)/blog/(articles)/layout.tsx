import { ReactNode } from 'react'

export default function ArticlesLayout({ children }: { children: ReactNode }) {
    return (
        <div className="container py-24">
            <article className="markdown inner-container">{children}</article>
        </div>
    )
}
