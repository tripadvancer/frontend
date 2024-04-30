import classNames from 'classnames'

import type { IPlace } from '@/utils/types/place'

import { ImageStub } from '@/components/ui/image-stub'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'

type PlacePreviewCoverProps = Pick<IPlace, 'title' | 'cover'> & {
    size: number
    imageVariant?: ImageVariant
    className?: string
}

export const PlacePreviewCover = (props: PlacePreviewCoverProps) => {
    if (!props.cover) {
        return (
            <div className={classNames('flex-center aspect-square w-full bg-black-5', props.className)}>
                <ImageStub className="w-1/3 text-black-15 opacity-75" />
            </div>
        )
    }

    return (
        <ImageWithFallback
            src={makeImageUrl(props.cover, props.imageVariant ?? ImageVariant.PREVIEW)}
            width={props.size}
            height={props.size}
            className={props.className}
            alt={props.title}
        />
    )
}
