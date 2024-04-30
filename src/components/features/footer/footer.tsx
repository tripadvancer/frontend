import Image from 'next/image'
import Link from 'next/link'

import { TwitterIcon24 } from '@/components/ui/icons'

import { LanguageChanger } from '../language-changer/language-changer'

export const Footer = async () => {
    return (
        <footer className="bg-white">
            <div className="container relative">
                <div className="border-t border-black-70" />

                <div className="inner-container flex flex-col items-center gap-y-4 py-8">
                    <div className="z-40 md:absolute md:right-8 md:top-8">
                        <LanguageChanger />
                    </div>

                    <nav className="flex-center flex-col flex-wrap gap-x-2 text-black-40 sm:flex-row">
                        <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>Contact Us</Link>
                        <span className="hidden sm:block">•</span>
                        <Link href="/legal/terms-and-conditions">Terms and Conditions</Link>
                        <span className="hidden sm:block">•</span>
                        <Link href="/legal/privacy-policy">Privacy Policy</Link>
                        <span className="hidden sm:block">•</span>
                        <Link href="/legal/cookie-policy">Cookie Policy</Link>
                    </nav>

                    <Link href="https://twitter.com/tripadvancer_me" className="link-black" target="_blank">
                        <TwitterIcon24 />
                    </Link>

                    <div className="text-center">
                        Powered by{' '}
                        <Link href="https://stadiamaps.com/" target="_blank">
                            Stadiamaps
                        </Link>
                        <div className="text-black-40">© Tripadvancer, 2024</div>
                    </div>

                    <Link
                        href="https://www.producthunt.com/posts/tripadvancer?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tripadvancer"
                        className="md:absolute md:bottom-8 md:right-8"
                        target="_blank"
                    >
                        <Image
                            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=431644&theme=light"
                            alt="Tripadvancer - Plan&#0032;your&#0032;trip&#0032;and&#0032;find&#0032;interesting&#0032;places | Product Hunt"
                            width="184"
                            height="40"
                        />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
