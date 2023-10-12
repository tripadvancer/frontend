import type { Metadata } from 'next/types'

import { PlacesFeed } from '@/components/PlacesFeed'
import { getPlacesByUserId } from '@/services/places'
import { getUserById } from '@/services/user'
import { getScopedI18n } from '@/utils/i18n.server'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const t = await getScopedI18n('pages.user.places.meta')
    const user = await getUserById(params.id)

    return {
        title: t('title', { username: user.name }),
        description: '',
    }
}

export default async function UserPlaces({
    params,
    searchParams,
}: {
    params: { id: string }
    searchParams: { page: string }
}) {
    const userId = params.id
    const currentPage = searchParams.page ?? '1'
    const places = await getPlacesByUserId(userId, currentPage)

    return <PlacesFeed places={places} currentPage={parseInt(currentPage)} />
}
