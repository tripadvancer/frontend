import Image from 'next/image'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

type AvatarProps = {
    src: string | null | undefined
    alt: string | undefined
    size: number
}

export const Avatar = ({ src, alt, size }: AvatarProps) => {
    if (src) {
        return (
            <Image
                src={makeImageUrl(src, ImageVariant.AVATAR)}
                width={size}
                height={size}
                className="rounded-full"
                alt={alt ?? 'avatar'}
            />
        )
    }

    return <div className="rounded-full bg-orange-100" style={{ width: size, height: size }} />
}
