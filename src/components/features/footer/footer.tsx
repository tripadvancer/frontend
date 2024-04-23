import Image from 'next/image'
import Link from 'next/link'

import { getI18n } from '@/utils/i18n/i18n.server'

export const Footer = async () => {
    const t = await getI18n()

    return (
        <footer className="bg-white">
            <div className="container">
                <div className="border-t border-black-70" />
                <div className="inner-container py-8">
                    <section className="mb-5 text-center text-black-70">
                        <h5 className="font-medium">{t('about.title')}</h5>
                        <p>{t('about.description')}</p>
                    </section>
                    <nav className="flex flex-row flex-wrap justify-center gap-x-2 text-black-40">
                        <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>Contact Us</Link>•
                        <Link href="/legal/terms-and-conditions">Terms and Conditions</Link>•
                        <Link href="/legal/privacy-policy">Privacy Policy</Link>•
                        <Link href="/legal/cookie-policy">Cookie Policy</Link>
                    </nav>
                    <div className="text-center text-black-40">© Tripadvancer, 2024</div>
                </div>
            </div>

            <a
                href="https://www.producthunt.com/posts/tripadvancer?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tripadvancer"
                target="_blank"
            >
                <Image
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=431644&theme=light"
                    alt="Tripadvancer - Plan&#0032;your&#0032;trip&#0032;and&#0032;find&#0032;interesting&#0032;places | Product Hunt"
                    style={{ width: '184px', height: '40px' }}
                    width={184}
                    height={40}
                />
            </a>
        </footer>
    )
}
