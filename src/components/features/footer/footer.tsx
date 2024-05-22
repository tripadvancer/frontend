import Image from 'next/image'
import Link from 'next/link'

import { TwitterIcon24, YoutubeIcon24 } from '@/components/ui/icons'

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

                    <div className="flex gap-x-4">
                        <Link href="https://twitter.com/tripadvancer_me" className="link-black" target="_blank">
                            <TwitterIcon24 />
                        </Link>
                        <Link href="https://www.youtube.com/@tripadvancer" className="link-black" target="_blank">
                            <YoutubeIcon24 />
                        </Link>
                    </div>

                    <div className="text-center">
                        Powered by{' '}
                        <Link href="https://stadiamaps.com/" target="_blank">
                            Stadiamaps
                        </Link>
                        <div className="text-black-40">© Tripadvancer, 2024</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
