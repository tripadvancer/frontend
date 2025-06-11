'use client'

import Link from 'next/link'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewMeta } from '@/components/ui/place-preview-meta'

type UserPlacesItemProps = {
    id: number
    title: string
    cover: string | null
    countryCode: string | null
    createdAt: Date
}

export const UserPlacesItem = ({ id, title, cover, countryCode, createdAt }: UserPlacesItemProps) => {
    return (
        <div>
            <Link href={`/places/${id}`} className="text-black-100">
                <div className="mb-2 flex-none">
                    <PlacePreviewCover cover={cover} title={title} size={192} className="aspect-square rounded-lg" />
                </div>
                <div className="line-clamp-3 break-words font-medium">{title}</div>
            </Link>

            <PlacePreviewMeta countryCode={countryCode} createdAt={createdAt} />
        </div>
    )
}
