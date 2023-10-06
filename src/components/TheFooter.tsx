import Link from 'next/link'

import { getScopedI18n } from '@/utils/i18n.server'

export const TheFooter = async () => {
    const t = await getScopedI18n('common')

    return (
        <footer>
            <div className="container border-t border-custom-black-70 py-8">
                <section className="mb-5 text-center text-sm text-custom-black-70">
                    <h4 className="mb-1 font-medium">{t('about.title')}</h4>
                    <p>{t('about.description.str_1')}</p>
                    <p>{t('about.description.str_2')}</p>
                </section>

                <nav className="mb-2">
                    <ul className="flex flex-row items-center justify-center gap-3 text-sm">
                        <li>
                            <Link href="/legal/terms-and-conditions" className="text-custom-black-40">
                                Terms and Conditions
                            </Link>
                        </li>
                        <li>
                            <Link href="/legal/privacy-policy" className="text-custom-black-40">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/legal/cookie-policy" className="text-custom-black-40">
                                Cookie Policy
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="text-center text-sm text-custom-black-40">© Tripadvancer, 2023</div>
            </div>
        </footer>
    )
}
