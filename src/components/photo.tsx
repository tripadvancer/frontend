import Image from 'next/image'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

type PhotoProps = {
    url: string
    size: number
    alt: string
    onClick: () => void
}

export const Photo = ({ url, size, alt, onClick }: PhotoProps) => {
    return (
        <Image
            src={makeImageUrl(url, ImageVariant.PREVIEW)}
            className="w-full cursor-pointer rounded-lg align-top"
            width={size}
            height={size}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8eftuPQAIOAMS40NHBQAAAABJRU5ErkJggg=="
            alt={alt}
            onClick={onClick}
        />
    )
}
