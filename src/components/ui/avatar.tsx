import Image from 'next/image'

import type { IUserInfo } from '@/utils/types/user'

import { ImageVariants } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'

type AvatarProps = {
    avatar: IUserInfo['avatar']
    name: IUserInfo['name']
    size: number
}

export const Avatar = ({ avatar, name, size }: AvatarProps) => {
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
        <div className="flex-center rounded-full bg-orange-100 text-white" style={{ width: size, height: size }}>
            {name[0].toUpperCase()}
        </div>
    )
}
