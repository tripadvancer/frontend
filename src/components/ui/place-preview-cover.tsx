import classNames from 'classnames'

import { ImageStub } from '@/components/ui/image-stub'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import { ImageVariants } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'

type PlacePreviewCoverProps = {
    title: string
    cover: string | null
    size: number
    imageVariant?: ImageVariants
    className?: string
}

export const PlacePreviewCover = ({ title, cover, size, imageVariant, className }: PlacePreviewCoverProps) => {
    if (!cover) {
        return (
            <div className={classNames('flex-center bg-black-5', className)}>
                <ImageStub className="w-1/3 text-black-15 opacity-75" />
            </div>
        )
    }

    return (
        <ImageWithFallback
            src={makeImageUrl(cover, imageVariant ?? ImageVariants.PREVIEW)}
            width={size}
            height={size}
            className={className}
            alt={title}
        />
    )
}
