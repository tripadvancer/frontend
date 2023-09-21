import { getPlaceById } from '@/services/get-place'

import Image from 'next/image'

import { Tabs } from '@/components/Tabs'

export default async function PlaceLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
    const place = await getPlaceById(params.id)

    return (
        <>
            <header className="relative flex h-[540px] flex-col">
                <Image src={place.cover + '/public'} className="-z-10 object-cover" alt={place.title} fill />
                <div className="phone:px-4 container flex-auto">
                    <h1 className="text-4xl">{place.title}</h1>
                </div>
                <div className="phone:px-4 phone:gap-x-0 container flex gap-x-8">
                    <Tabs
                        tabs={[
                            { label: 'Overview', href: `/places/${place.id}` },
                            { label: 'Photos', href: `/places/${place.id}/photos` },
                        ]}
                    />
                    <div className="phone:w-auto w-64" />
                </div>
            </header>
            <div className="phone:px-4 phone:flex-col-reverse container flex gap-x-8 bg-yellow-100 py-16">
                <main className="flex-auto bg-blue-100">{children}</main>
                <aside className="phone:w-auto w-64 flex-none bg-green-100">Aside</aside>
            </div>
        </>
    )
}
