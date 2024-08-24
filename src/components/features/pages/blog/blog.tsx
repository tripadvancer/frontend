import Link from 'next/link'

export const Blog = () => {
    return (
        <section className="container py-24">
            <article className="text-pretty">
                <h1 className="h1 mb-4 text-center">Blog</h1>
                <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                    On the pages of our blog, you will find a wealth of valuable information about our service,
                    recommendations from experienced travelers, as well as other useful information related to the world
                    of travel.
                </p>
            </article>

            <Link href="/blog/discovering-warsaw-top-10-places">Discovering Warsaw: 10 Must-See Places in Poland&apos;s Capital</Link>
        </section>
    )
}
