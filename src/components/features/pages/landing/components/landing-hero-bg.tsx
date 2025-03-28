'use client'

import { useMediaQuery } from 'usehooks-ts'

export const LandingHeroBg = () => {
    const isMobile = useMediaQuery('(max-width: 639px)')
    const isTablet = useMediaQuery('(max-width: 1023px)')

    if (isMobile || isTablet) {
        return null
    }

    return (
        <div className="absolute size-full bg-[url('/images/landing-hero-bg-1.svg')] bg-center bg-no-repeat">
            <div className="absolute size-full bg-[url('/images/landing-hero-bg-2.svg')] bg-center bg-no-repeat" />
            <div className="absolute size-full bg-[url('/images/landing-hero-bg-3.svg')] bg-center bg-no-repeat" />
            <div className="absolute size-full bg-[url('/images/landing-hero-bg-4.svg')] bg-center bg-no-repeat" />
        </div>
    )
}
