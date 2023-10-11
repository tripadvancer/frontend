import Link from 'next/link'

import { getScopedI18n } from '@/utils/i18n.server'

export const Footer = async () => {
    const t = await getScopedI18n('common')

    return (
        <footer className="px-8 py-8 phone:px-4">
            <div className="container">
                <div className="mb-8 border-t border-custom-black-70" />
                <div className="inner-container">
                    <section className="mb-5 text-center text-sm text-custom-black-70">
                        <h4 className="mb-1 font-medium">{t('about.title')}</h4>
                        <p>
                            {t('about.description.str_1')} {t('about.description.str_2')}
                        </p>
                    </section>

                    <nav className="mb-2 flex flex-row flex-wrap justify-center gap-x-2 text-sm text-custom-black-40">
                        <Link href="mailto:support@tripadvancer.me">Contact Us</Link>•
                        <Link href="/legal/terms-and-conditions">Terms and Conditions</Link>•
                        <Link href="/legal/privacy-policy">Privacy Policy</Link>•
                        <Link href="/legal/cookie-policy">Cookie Policy</Link>
                    </nav>

                    <div className="text-center text-sm text-custom-black-40">© Tripadvancer, 2023</div>
                </div>
            </div>
        </footer>
    )
}
