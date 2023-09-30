'use client'

import Image from 'next/image'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div className="container flex min-h-screen py-16 phone:flex-col phone:px-4 tablet:flex-row tablet:items-center tablet:justify-center tablet:gap-16 desktop:flex-row desktop:items-center desktop:justify-center desktop:gap-32">
            <Image src="/images/500.svg" width={352} height={406} className="grow phone:hidden" alt="404" />
            <div className="phone:flex phone:flex-col phone:items-center phone:text-center">
                <Image src="/images/logo.svg" width={140} height={24} className="mb-16" alt="Tripadvancer" />
                <Image
                    src="/images/500.svg"
                    width={352}
                    height={406}
                    className="mb-16 phone:w-72 tablet:hidden desktop:hidden"
                    alt="404"
                />
                <h2 className="mb-8 text-3xl font-medium">Oops! Something Went Wrong</h2>
                <p className="mb-8 text-base text-custom-black-70">
                    We are really sorry, but it seems like there is a hiccup in the digital universe. Our servers are
                    currently experiencing technical difficulties, and we are working diligently to get things back on
                    track.
                </p>
                <div className="cursor-pointer" onClick={() => reset()}>
                    Try again
                </div>
            </div>
        </div>
    )
}
