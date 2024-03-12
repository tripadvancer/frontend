import classNames from 'classnames'

import Image from 'next/image'

import { IPlacePreview } from '@/utils/types/place'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

type PlacePreviewCoverProps = IPlacePreview & {
    size?: number
    isCover?: boolean
    isRounded?: boolean
}

export const PlacePreviewCover = ({ cover, title, size, isCover, isRounded }: PlacePreviewCoverProps) => {
    if (cover) {
        return isCover ? (
            <Image
                src={makeImageUrl(cover, ImageVariant.PUBLIC)}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                className={classNames(isRounded ? 'rounded-full' : 'rounded-lg', 'aspect-video')}
                alt={title}
            />
        ) : (
            <Image
                src={makeImageUrl(cover, ImageVariant.PREVIEW)}
                width={size}
                height={size}
                className={isRounded ? 'rounded-full' : 'rounded-lg'}
                alt={title}
            />
        )
    }

    return (
        <div
            className={classNames(
                'flex-center aspect-square flex-none bg-black-5 text-white',
                isRounded ? 'rounded-full' : 'rounded-lg',
                !size && 'aspect-video',
            )}
            style={{ maxWidth: size, maxHeight: size }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18" className="w-2/5">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
        </div>
    )
}
