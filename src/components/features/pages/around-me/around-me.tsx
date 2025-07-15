import { MapPin } from 'lucide-react'

import Link from 'next/link'

import { ImageWithFallback } from '@/components/ui/image-with-fallback'

export const AroundMe = () => {
    return (
        <div className="container py-24">
            <section>
                <div className="mb-16 text-center">
                    <h1 className="h1 mb-4">Places Around Me</h1>
                    <p className="text-big text-black-70">Discover places near your current location.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div className="group relative overflow-hidden rounded-2xl">
                            <Link href={`/places/1`} className="text-white hover:text-white">
                                <ImageWithFallback
                                    src="https://imagedelivery.net/ZBEqKIKgZgKrPlD3ay4FLg/d775f5a1-5149-463b-ffae-42ba9cbaf300/preview"
                                    width={256}
                                    height={256}
                                    className="aspect-square w-full rounded-2xl transition duration-300 group-hover:scale-110"
                                    alt={'Poland'}
                                />

                                <div className="pointer-events-none absolute left-0 top-full h-12 w-full bg-gradient-to-b from-black-100 to-transparent" />
                                <div className="h6 absolute bottom-0 p-4">Attraction name</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
