import type { Metadata } from 'next/types'
import { getPlaceById } from '@/services/get-place'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const place = await getPlaceById(params.id)

    return {
        title: `${place.title}, ${place.countryCode} | Tripadvancer`,
        description: place.description,
    }
}

export default async function Place({ params }: { params: { id: string } }) {
    const place = await getPlaceById(params.id)

    return (
        <section>
            <h2 className="mb-8 text-2xl">Description</h2>
            <p>Здесь находится текст и другой контент вашей страницы.</p>
        </section>
    )
}
