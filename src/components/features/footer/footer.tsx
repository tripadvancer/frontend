import Link from 'next/link'

import { TwitterIcon24 } from '@/components/ui/icons'
import { getI18n } from '@/utils/i18n/i18n.server'

export const Footer = async () => {
    const t = await getI18n()

    return (
        <footer className="bg-white">
            <div className="container">
                <div className="border-t border-black-70" />
                <div className="inner-container flex flex-col items-center gap-y-4 py-8">
                    <nav className="flex flex-row flex-wrap justify-center gap-x-2 text-black-40">
                        <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>Contact Us</Link>•
                        <Link href="/legal/terms-and-conditions">Terms and Conditions</Link>•
                        <Link href="/legal/privacy-policy">Privacy Policy</Link>•
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
                </div>
            </div>
        </footer>
    )
}
