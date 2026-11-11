'use client'

import Image from 'next/image'
import Link from 'next/link'

import { FormButton } from '@/components/ui/form-button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    // todo: create common error page with 404 and 500
    return (
        <div className="container flex min-h-screen flex-col items-center py-16 md:flex-row md:gap-x-8 lg:gap-x-16 xl:gap-x-32">
            <Image
                src="/images/error-500.svg"
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
                    src="/images/error-500.svg"
                    width={352}
                    height={406}
                    className="mb-16 md:hidden"
                    alt="404"
                    priority
                />
                <h2 className="h3 mb-8">Oops! Something Went Wrong</h2>
                <p className="mb-8 text-big text-black-70">
                    We are really sorry, but it seems like there is a hiccup in the digital universe. Our servers are
                    currently experiencing technical difficulties, and we are working diligently to get things back on
                    track.
                </p>
                <FormButton htmlType="button" onClick={() => reset()}>
                    Try again
                </FormButton>
            </div>
        </div>
    )
}
