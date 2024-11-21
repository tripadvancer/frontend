'use client'

import { MouseParallaxChild, MouseParallaxContainer } from 'react-parallax-mouse'

import { FormButton } from '@/components/ui/form-button'

export const LandingHero = () => {
    return (
        <div className="h-[700px] bg-blue-80 pb-7">
            <MouseParallaxContainer
                globalFactorX={0.1}
                globalFactorY={0.1}
                className="relative size-full bg-[url('/images/landing-hero-bg-1.svg')] bg-center bg-no-repeat"
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

                <div className="absolute left-1/2 top-1/2 -translate-x-full -translate-y-1/2 transform">
                    <h1 className="h1 mb-4 text-white">
                        Track & Share
                        <br />
                        Your Travel Adventures!
                    </h1>
                    <p className="mb-8 text-big text-white">
                        Register to add favorite spots, share them with others, and
                        <br />
                        build your own map of visited countries.
                    </p>
                    <FormButton variant="orange">Join Now</FormButton>
                </div>
            </MouseParallaxContainer>
        </div>
    )
}
