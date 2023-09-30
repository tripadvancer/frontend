import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
    title: 'Page not found | Tripadvancer',
    description: 'Sorry, but the page you are looking for cannot be found.',
}

export default function NotFound() {
    return (
        <div className="container flex min-h-screen py-16 phone:flex-col phone:px-4 tablet:flex-row tablet:items-center tablet:justify-center tablet:gap-16 desktop:flex-row desktop:items-center desktop:justify-center desktop:gap-32">
            <Image src="/images/404.svg" width={352} height={406} className="grow phone:hidden" alt="404" />
            <div className="phone:flex phone:flex-col phone:items-center phone:text-center">
                <Link href="/">
                    <Image src="/images/logo.svg" width={140} height={24} className="mb-16" alt="Tripadvancer" />
                </Link>
                <Image
                    src="/images/404.svg"
                    width={352}
                    height={406}
                    className="mb-16 phone:w-72 tablet:hidden desktop:hidden"
                    alt="404"
                />
                <h2 className="mb-8 text-3xl font-medium">Page not found</h2>
                <p className="mb-8 text-base text-custom-black-70">
                    We are sorry, but it seems you have ventured into uncharted territory. The page you were looking for
                    has either been moved, deleted, or never existed in the first place.
                </p>
                <Link href="/">Return Home</Link>
            </div>
        </div>
    )
}
