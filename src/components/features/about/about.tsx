import Image from 'next/image'
import Link from 'next/link'

export const About = () => {
    return (
        <div className="flex flex-col">
            <div className="flex-center relative z-10 flex-[540px] pb-7">
                <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full">
                    <Image src={'/images/about.jpg'} alt="About Tripadvancer" fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-black-100 opacity-50" />
                </div>
                <section className="container relative z-30 py-8 text-center">
                    <div className="m-auto sm:w-2/3">
                        <h1 className="h1 mb-4 text-white">About Tripadvancer</h1>
                        <p className="text-big text-white">
                            A platform built by travelers — for discovering, sharing, and remembering amazing places.
                        </p>
                    </div>
                </section>
            </div>

            <div className="container flex-1 bg-white">
                <div className="inner-container flex flex-col gap-y-8 py-24 text-big">
                    <p>
                        <strong>Tripadvancer</strong> is&nbsp;a&nbsp;platform where travelers share the most interesting
                        places they&rsquo;ve discovered&nbsp;&mdash; hidden gems, unusual spots, and local favorites all
                        over the world.
                    </p>

                    <p>
                        We&nbsp;believe the best travel experiences aren&rsquo;t always in&nbsp;guidebooks.
                        They&rsquo;re often in&nbsp;the cozy caf&eacute; by&nbsp;the canal, the old lighthouse
                        at&nbsp;the edge of&nbsp;nowhere, or&nbsp;a&nbsp;quiet viewpoint only locals know.
                        On&nbsp;Tripadvancer, those places live&nbsp;on{' '}
                        <Link href="/maps" target="_blank">
                            the Map
                        </Link>{' '}
                        &mdash;&nbsp;shared by&nbsp;real people who&rsquo;ve been there.
                    </p>

                    <hr />
                    <h2 className="h5">Here&rsquo;s what you can&nbsp;do:</h2>

                    <ul className="list-disc space-y-2 pl-4 sm:pl-8">
                        <li>Share your favorite locations by adding them to the map,</li>
                        <li>Discover cool new places recommended by other travelers,</li>
                        <li>Leave reviews and tips about places you&rsquo;ve visited,</li>
                        <li>
                            Keep your own travel journal&nbsp;&mdash; mark places you&rsquo;ve been, save memories, and
                            share them,
                        </li>
                        <li>Track the countries you&rsquo;ve already explored,</li>
                        <li>
                            Create and organize custom travel lists to plan your trips and access them easily while on
                            the go.
                        </li>
                    </ul>

                    <hr />
                    <h2 className="h5">Why we built this</h2>

                    <p>
                        Because the world is&nbsp;full of&nbsp;amazing places&nbsp;&mdash; and we&nbsp;think sharing
                        your discoveries is&nbsp;part of the journey. It&rsquo;s a&nbsp;way to&nbsp;travel together,
                        even when we&rsquo;re far apart.
                    </p>

                    <hr />
                    <h2 className="h5">Join us</h2>

                    <p>
                        Tripadvancer is&nbsp;a&nbsp;passion project created out of&nbsp;love for travel, maps, and the
                        joy of exchanging experiences. We&rsquo;re open to&nbsp;ideas, feedback, and friendly words.
                        Start your journey &mdash; add your first spot to&nbsp;the map today.
                    </p>

                    <hr />
                    <h2 className="h5">Stay Connected</h2>

                    <address className="not-italic">
                        <ul className="list-disc space-y-2 pl-8">
                            <li>
                                <Link
                                    href="https://twitter.com/tripadvancer_me"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    X (Twitter)
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.youtube.com/@tripadvancer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    YouTube
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="mailto: tripadvancer.team@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Email
                                </Link>
                            </li>
                            <li>
                                <Link href="https://medium.com/@oskolsky" target="_blank" rel="noopener noreferrer">
                                    Medium
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.linkedin.com/in/oskolsky/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn
                                </Link>
                            </li>
                        </ul>
                    </address>
                </div>
            </div>
        </div>
    )
}
