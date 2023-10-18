import Link from 'next/link'

import { getScopedI18n } from '@/utils/i18n.server'

export const Footer = async () => {
    const t = await getScopedI18n('common')

    return (
        <footer className="bg-white">
            <div className="container">
                <div className="border-black-70 border-t" />
                <div className="inner-container py-8">
                    <section className="text-black-70 mb-5  text-center">
                        <h5 className="font-medium">{t('about.title')}</h5>
                        <p>{t('about.description.str_1')}</p>
                    </section>
                    <nav className="text-black-40 flex flex-row flex-wrap justify-center  gap-x-2">
                        <Link href="mailto:support@tripadvancer.me" className="text-blue-100">
                            Contact Us
                        </Link>
                        •
                        <Link href="/legal/terms-and-conditions" className="text-blue-100">
                            Terms and Conditions
                        </Link>
                        •
                        <Link href="/legal/privacy-policy" className="text-blue-100">
                            Privacy Policy
                        </Link>
                        •
                        <Link href="/legal/cookie-policy" className="text-blue-100">
                            Cookie Policy
                        </Link>
                    </nav>
                    <div className="text-black-40  text-center">© Tripadvancer, 2023</div>
                </div>
            </div>
        </footer>
    )
}
