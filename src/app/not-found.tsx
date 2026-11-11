import Image from 'next/image'
import Link from 'next/link'

import { LinkButton } from '@/components/ui/link-button'

export default async function NotFound() {
    return (
        <div className="container flex min-h-screen flex-col items-center py-16 md:flex-row md:gap-x-8 lg:gap-x-16 xl:gap-x-32">
            <Image
                src="/images/error-404.svg"
                width={352}
                height={406}
                className="hidden grow md:block"
                alt="404"
                priority
            />
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <Link href="/">
                    <Image src="/images/logo.svg" width={140} height={24} className="mb-16" alt="Tripadvancer" />
                </Link>
                <Image
                    src="/images/error-404.svg"
                    width={352}
                    height={406}
                    className="mb-16 md:hidden"
                    alt="404"
                    priority
                />
                <h2 className="h3 mb-8">Page not found</h2>
                <p className="mb-8 text-big text-black-70">
                    We are sorry, but it seems you have ventured into uncharted territory. The page you were looking for
                    has either been moved, deleted, or never existed in the first place.
                </p>
                <LinkButton href="/">Return Home</LinkButton>
            </div>
        </div>
    )
}
