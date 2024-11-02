'use client'

import { ParallaxBanner } from 'react-scroll-parallax'

import { ImageVariants } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'

type PlaceHeaderCoverProps = {
    cover: string | null
}

export const PlaceHeaderCover = ({ cover }: PlaceHeaderCoverProps) => {
    const src = makeImageUrl(cover, ImageVariants.PUBLIC)

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
            <div className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-black-100 opacity-50" />
        </div>
    )
}
