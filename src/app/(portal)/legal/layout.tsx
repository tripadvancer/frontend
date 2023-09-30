export default function LegalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container py-16">
            <article className="prose max-w-none">{children}</article>
        </div>
    )
}
