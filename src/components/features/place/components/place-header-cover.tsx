'use client'

import { ParallaxBanner } from 'react-scroll-parallax'

import type { IPlace } from '@/utils/types/place'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

export const PlaceHeaderCover = ({ cover }: IPlace) => {
    const src = makeImageUrl(cover, ImageVariant.PUBLIC)

    return (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full">
            {cover && (
                <ParallaxBanner
                    layers={[
                        {
                            image: src,
                            speed: -20,
                        },
                    ]}
                    className="h-full w-full object-cover"
                />
            )}
            <div className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-black-100 opacity-30" />
        </div>
    )
}
