'use client'

import { MouseParallaxChild, MouseParallaxContainer } from 'react-parallax-mouse'

import { useMediaQuery } from 'usehooks-ts'

export const LandingHeroBg = () => {
    const isMobile = useMediaQuery('(max-width: 639px)')
    const isTablet = useMediaQuery('(max-width: 1023px)')

    if (isMobile || isTablet) {
        return null
    }

    return (
        <MouseParallaxContainer
            globalFactorX={0.1}
            globalFactorY={0.1}
            className="absolute size-full bg-[url('/images/landing-hero-bg-1.svg')] bg-center bg-no-repeat"
        >
            <MouseParallaxChild
                factorX={0.1}
                factorY={0.1}
                inverted
                className="absolute size-full bg-[url('/images/landing-hero-bg-2.svg')] bg-center bg-no-repeat"
            />
            <MouseParallaxChild
                factorX={0.15}
                factorY={0.15}
                className="absolute size-full bg-[url('/images/landing-hero-bg-3.svg')] bg-center bg-no-repeat"
            />
            <MouseParallaxChild
                factorX={0}
                factorY={0}
                className="absolute size-full bg-[url('/images/landing-hero-bg-4.svg')] bg-center bg-no-repeat"
            />
        </MouseParallaxContainer>
    )
}
