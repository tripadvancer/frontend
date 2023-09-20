import { getPlaceById } from '@/services/places'

import { Tabs } from '@/components/Tabs'

export default async function PlaceLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
    const place = await getPlaceById(params.id)

    return (
        <>
            <header className="bg-red-100">
                <div className="phone:px-4 container bg-red-100">
                    <h1 className="text-4xl">{place.title}</h1>
                </div>
                <div className="phone:px-4 phone:gap-x-0 container flex gap-x-8 bg-red-100">
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
