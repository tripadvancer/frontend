import Image from 'next/image'
import Link from 'next/link'

export const FeedArticlesItem = ({ theme }: { theme: string }) => {
    return (
        <Link href="/blog/1" className="link-black">
            <figure className="flex flex-col gap-y-4">
                <Image
                    src={`https://source.unsplash.com/352x180/?${theme}`}
                    alt="random"
                    width={352}
                    height={180}
                    className="rounded-2xl"
                />
                <div className="text-small text-black-40">2021-09-01</div>
                <figcaption className="flex flex-col gap-y-4">
                    <h2 className="h7">How to find a random place around you</h2>
                    <p className="text-black-70">
                        Third Party Cookies have been synonymous with user tracking and privacy issues. In 2021 Google
                        put forth a plan to retire third party cookies from chromium based browsers and put for the
                        FedCM APIs. In this blog we will be discussing this change and what it means for traditional
                        OAuth flows.
                    </p>
                </figcaption>
            </figure>
        </Link>
    )
}
