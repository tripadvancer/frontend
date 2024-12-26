import Image from 'next/image'

import { ImageVariants } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'

type AvatarProps = {
    name: string
    avatar: string | null
    size: number
}

export const Avatar = ({ name, avatar, size }: AvatarProps) => {
    if (avatar) {
        return (
            <Image
                src={makeImageUrl(avatar, ImageVariants.AVATAR)}
                width={size}
                height={size}
                className="rounded-full"
                alt={name}
            />
        )
    }

    return (
        <div className="flex-center rounded-full bg-blue-100 text-white" style={{ width: size, height: size }}>
            {name[0].toUpperCase()}
        </div>
    )
}
