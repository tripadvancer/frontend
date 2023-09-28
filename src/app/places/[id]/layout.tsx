import Image from 'next/image'

import { getPlaceById } from '@/services/places'

import { Tabs } from '@/components/Tabs'

export default async function PlaceLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
    const place = await getPlaceById(params.id)

    return (
        <div className="flex min-h-screen flex-col">
            <div className="relative h-[540px]">
                <Image src={place.cover + '/public'} className="-z-10 object-cover" alt={place.title} fill priority />
                <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-gradient-to-b from-custom-black-100 to-transparent opacity-50" />
                <div className="container flex h-full flex-col phone:px-4">
                    <div className="flex-1 py-16">
                        <h1 className="mb-2 text-4xl text-white">{place.title}</h1>
                        <div className="mb-4 text-base text-white">
                            {place.location.coordinates[1].toFixed(5)}, {place.location.coordinates[0].toFixed(5)}
                        </div>
                        <div className="flex gap-2">
                            {place.categories.map(category => (
                                <div
                                    key={category.id}
                                    className="flex h-8 items-center rounded-full border border-white px-4 text-xs text-white"
                                >
                                    {category.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-x-8 pb-8">
                        <Tabs
                            tabs={[
                                { label: 'Overview', href: `/places/${place.id}` },
                                { label: 'Photos', href: `/places/${place.id}/photos` },
                            ]}
                            className="flex-1"
                        />
                        <div className="w-64 phone:hidden" />
                    </div>
                </div>
            </div>

            <div className="-mt-8 flex-1 rounded-t-4xl bg-white phone:rounded-none">
                <div className="container flex gap-x-8 py-16 phone:flex-col-reverse phone:px-4">
                    <div className="flex-auto">{children}</div>
                    <div className="w-64 flex-none phone:w-auto">
                        <section>
                            <h3 className="text-sm uppercase">Places nearby</h3>
                            <div>
                                
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
