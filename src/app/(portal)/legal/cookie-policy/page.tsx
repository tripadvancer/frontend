import { Metadata } from 'next/types'

import { SupportEmailLink } from '@/components/features/common/support-email-link'
import { ExternalLink } from '@/components/ui/external-link'

export const metadata: Metadata = {
    title: 'Cookie Policy',
    alternates: {
        canonical: 'legal/cookie-policy',
    },
}

export default function LegalCookiePolicyPage() {
    return (
        <article className="inner-container">
            <h1 className="h1 mb-4 text-center">Cookie Policy</h1>

            <div className="flex flex-col gap-y-16">
                <section className="text-black-70 text-center">
                    <p className="mb-5">
                        This Cookie Policy explains the essential browser storage and optional analytics used by
                        Tripadvancer. Optional analytics run only after you choose to accept them.
                    </p>
                    <p>Effective Date: November&nbsp;19, 2026</p>
                </section>

                <section>
                    <h2 className="h5 mb-8">What are Cookies?</h2>
                    <p>
                        Cookies are small text files that are placed on&nbsp;your device (e.g., computer, smartphone,
                        or&nbsp;tablet) when you visit a&nbsp;website. They are widely used to&nbsp;make websites work
                        or&nbsp;to&nbsp;improve their efficiency, as&nbsp;well as&nbsp;to&nbsp;provide information
                        to&nbsp;the website owners.
                    </p>
                </section>

                <section>
                    <h2 className="h5 mb-8">How We&nbsp;Use Cookies</h2>
                    <p className="mb-5">We&nbsp;use cookies for the following purposes:</p>
                    <ol className="list-outside list-decimal pl-12">
                        <li className="mb-3">
                            <strong>Essential Cookies:</strong> These cookies are necessary for the operation
                            of&nbsp;our web service. They enable you to&nbsp;navigate the website and use its features,
                            such as&nbsp;accessing secure areas. Without these cookies, certain services may not
                            be&nbsp;available to&nbsp;you.
                        </li>
                        <li className="mb-3">
                            <strong>Optional analytics:</strong> If you accept, Google Analytics and Yandex Metrica load
                            and may use cookies or similar identifiers to measure visits and interactions. Yandex
                            Metrica session replay is enabled. Analytics may process network and device information; we
                            do not describe this data as anonymous.
                        </li>
                        <li>
                            <strong>No advertising cookies:</strong> Tripadvancer does not currently use advertising
                            cookies for personalized ads.
                        </li>
                    </ol>
                </section>

                <section>
                    <h2 className="h5 mb-8">Your Cookie Choices</h2>
                    <p>
                        The analytics banner offers Accept analytics and Reject analytics. Rejecting keeps optional
                        analytics disabled while essential storage needed for site operation remains available. Your
                        choice is saved in browser storage. You may withdraw a previous acceptance by clearing the site
                        data in your browser; the banner will then be shown again.
                    </p>
                </section>

                <section>
                    <h2 className="h5 mb-8">Managing Cookies</h2>
                    <p>
                        You can manage your cookie preferences by&nbsp;adjusting the settings in&nbsp;your web browser.
                        Each browser has different methods for managing cookies, so&nbsp;please refer to&nbsp;the
                        instructions provided by&nbsp;your browser&rsquo;s manufacturer. You can also visit{' '}
                        <ExternalLink href="https://www.allaboutcookies.org">www.allaboutcookies.org</ExternalLink> for
                        more information on&nbsp;how to&nbsp;manage and delete cookies.
                    </p>
                </section>

                <section>
                    <h2 className="h5 mb-8">Updates to&nbsp;this Cookie Policy</h2>
                    <p>
                        We&nbsp;may update this Cookie Policy from time to&nbsp;time to&nbsp;reflect changes in&nbsp;our
                        practices or&nbsp;for other operational, legal, or&nbsp;regulatory reasons. We&nbsp;encourage
                        you to&nbsp;review this policy periodically to&nbsp;stay informed about our use of&nbsp;cookies.
                    </p>
                </section>

                <section>
                    <h2 className="h5 mb-8">Contacting&nbsp;us</h2>
                    <p>
                        If&nbsp;you have any questions, concerns, or&nbsp;complaints regarding this Cookie Policy,
                        we&nbsp;encourage you to contact&nbsp;us using the details below: <SupportEmailLink />.
                    </p>
                </section>

                <p className="text-black-70 text-center">
                    This document was last updated on&nbsp;November&nbsp;19, 2026
                </p>
            </div>
        </article>
    )
}
