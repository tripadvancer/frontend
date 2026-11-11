import Image from 'next/image'
import Link from 'next/link'

export const LandingMaps = async () => {
    return (
        <section>
            <h3 className="h3 mb-4 text-center">Not enough? Use our map</h3>
            <p className="text-big text-black-70 m-auto mb-16 w-full text-center sm:w-2/3">
                If you’re looking for even more options, use our map with attractions to discover interesting places
                worldwide. Easily plan your travels and share your discoveries with fellow adventurers.
            </p>
            <Link href="/maps">
                <Image
                    src="/images/map.jpg"
                    width={928}
                    height={580}
                    className="m-auto mb-8"
                    alt="The best trip planner"
                />
            </Link>
            <div className="text-center">
                <Link
                    href="/maps"
                    className="hover-animated hover:bg-orange-active inline-flex h-10 items-center rounded-lg bg-orange-100 px-6 whitespace-nowrap text-white hover:text-white"
                >
                    Go to Tripadvancer Map
                </Link>
            </div>
        </section>
    )
}
