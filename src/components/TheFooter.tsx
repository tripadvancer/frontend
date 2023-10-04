import Link from 'next/link'

import getIntl from '@/utils/intl'

export const TheFooter = async () => {
    const intl = await getIntl('footer')

    return (
        <footer>
            <div className="container border-t border-custom-black-70 py-8">
                <section className="mb-5 text-center text-sm text-custom-black-70">
                    <h4 className="mb-1 font-medium">{intl.formatMessage({ id: 'about.title' })}</h4>
                    <p>{intl.formatMessage({ id: 'about.text.1' })}</p>
                    <p>{intl.formatMessage({ id: 'about.text.2' })}</p>
                </section>

                <nav className="mb-2">
                    <ul className="flex flex-row items-center justify-center gap-3 text-sm">
                        <li>
                            <Link href="/legal/terms-and-conditions" className="text-custom-black-40">
                                {intl.formatMessage({ id: 'link.legal.terms_and_conditions' })}
                            </Link>
                        </li>
                        <li>
                            <Link href="/legal/privacy-policy" className="text-custom-black-40">
                                {intl.formatMessage({ id: 'link.legal.privacy_policy' })}
                            </Link>
                        </li>
                        <li>
                            <Link href="/legal/cookie-policy" className="text-custom-black-40">
                                {intl.formatMessage({ id: 'link.legal.cookie_policy' })}
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="text-center text-sm text-custom-black-40">© Tripadvancer, 2023</div>
            </div>
        </footer>
    )
}
