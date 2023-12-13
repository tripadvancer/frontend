import { notFound } from 'next/navigation'

import { Button } from '@/components/forms/button/button'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

export default async function AddPlacePage() {
    const { session, hasToken } = await getSSRSession()

    if (!session) {
        if (!hasToken) {
            notFound()
        }

        return <TryRefreshComponent />
    }

    return (
        <form className="flex flex-col">
            <div className="relative z-10 -mb-8 flex flex-[540px] items-center justify-center pb-8">
                <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full">
                    {/* {cover && <Image src={src} alt={title} fill priority className="object-cover" />} */}
                    <div className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-black-100 opacity-30" />
                </div>
                <section className="container relative z-30 py-8">
                    <div className="m-auto flex flex-col items-center justify-center gap-y-4 sm:w-2/3">
                        <div className="font-medium text-white hover:text-white">
                            Upload the cover (jpg, png up to 10 MB)
                        </div>
                        <h1 className="text-center text-h1-m text-white sm:text-h1">Place name</h1>
                        <div className="inline-flex cursor-pointer gap-2 text-big text-white">Coordinates</div>
                        <div className="flex gap-2">
                            <div className="flex h-8 items-center rounded-full border border-white px-4 text-small text-white">
                                Категория 1
                            </div>
                            <div className="flex h-8 items-center rounded-full border border-white px-4 text-small text-white">
                                Категория 2
                            </div>
                            <div className="flex h-8 items-center rounded-full border border-white px-4 text-small text-white">
                                Категория 3
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="relative z-20 flex-1 rounded-t-4xl bg-white">
                <div className="container py-24">
                    <div className="inner-container flex flex-col gap-y-16">
                        <div>
                            <h2 className="mb-8 text-h5-m sm:text-h5">About this place</h2>
                            <div className="flex flex-col gap-8 lg:flex-row-reverse">
                                <div className="w-full text-black-40 lg:w-64">
                                    Tell us what inspired you so you can help others learn more about this place.
                                </div>
                                <div className="flex-1">1212</div>
                            </div>
                        </div>
                        <div>
                            <h2 className="mb-8 text-h5-m sm:text-h5">Photos</h2>
                            <div className="flex flex-col gap-8 lg:flex-row-reverse">
                                <div className="w-full text-black-40 lg:w-64">
                                    You can upload up to 10 photos of the place.
                                </div>
                                <div className="flex-1">1212</div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row lg:gap-x-8">
                            <div className="flex-1">
                                <Button className="mb-4 w-full">Add a place</Button>
                                <p className="text-center text-small text-black-40">
                                    By adding a new object to the map, you accept the Terms and Conditions, Privacy
                                    Policy and consent to their processing.
                                </p>
                            </div>
                            <div className="w-full lg:w-64" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
