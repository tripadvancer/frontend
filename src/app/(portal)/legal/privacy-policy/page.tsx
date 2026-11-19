import { Metadata } from 'next/types'

import { SupportEmailLink } from '@/components/features/common/support-email-link'

export const metadata: Metadata = {
    title: 'Privacy Policy',
    alternates: {
        canonical: 'legal/privacy-policy',
    },
}

export default function LegalPrivacyPolicyPage() {
    return (
        <article className="inner-container">
            <h1 className="h1 mb-4 text-center">Privacy Policy</h1>

            <div className="flex flex-col gap-y-16">
                <section className="text-black-70 text-center">
                    <p className="mb-5">
                        This Privacy Policy explains what information Tripadvancer processes, why it is needed, and
                        which service providers receive it. Use of the service does not itself constitute consent to
                        optional analytics.
                    </p>
                    <p>Effective Date: November&nbsp;19, 2026</p>
                </section>

                <section>
                    <h2 className="h5 mb-8">Information We&nbsp;Collect</h2>
                    <p className="mb-5">Depending on the features you use, we process:</p>
                    <ul className="mb-5 list-outside list-disc pl-12">
                        <li className="mb-3">
                            <strong>Email address:</strong> We&nbsp;collect your email address to&nbsp;facilitate
                            communication and account management.
                        </li>
                        <li className="mb-3">
                            <strong>Username:</strong> We&nbsp;collect your chosen username for identification purposes
                            within our platform.
                        </li>
                        <li className="mb-3">
                            <strong>Content and activity:</strong> Places, reviews, photos, saved lists, visited-country
                            selections, and coordinates you submit or choose to use app features. When you use device
                            geolocation for the map, the precise position is held in memory for that page session and is
                            not saved in browser storage.
                        </li>
                        <li>
                            <strong>Technical data:</strong> Request and security logs needed to operate, protect, and
                            troubleshoot the service.
                        </li>
                    </ul>
                    <p>
                        Please note that we&nbsp;do&nbsp;not store any personal images directly on&nbsp;our service.
                        Images uploaded by&nbsp;users are stored by&nbsp;a&nbsp;third-party provider, Cloudflare. These
                        images are removed from our service upon your request or&nbsp;when you delete them from our
                        platform.
                    </p>
                </section>

                <section>
                    <h2 className="h5 mb-8">Use of&nbsp;Personal Information</h2>
                    <p className="mb-5">We&nbsp;use the collected information for the following purposes:</p>
                    <ul className="mb-5 list-outside list-disc pl-12">
                        <li className="mb-3">
                            <strong>Communication</strong>: We&nbsp;may use your email address to&nbsp;communicate with
                            you regarding your account, updates, and relevant information.
                        </li>
                        <li className="mb-3">
                            <strong>Account Management:</strong> Your username and account information are used for
                            identification and authentication purposes.
                        </li>
                        <li>
                            <strong>Service Improvement:</strong> The information you provide helps&nbsp;us enhance and
                            personalize your user experience within our platform.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="h5 mb-8">Data Sharing</h2>
                    <p className="mb-5">
                        We use service providers to operate Tripadvancer. Cloudflare Images stores and serves uploaded
                        images; uploads include the image file and technical upload metadata, but we no longer include
                        your internal Tripadvancer user ID in the uploaded filename. Cloudflare necessarily receives the
                        network address of the upload connection.
                    </p>
                    <p className="mb-5">
                        Our authentication service processes account identifiers, credentials or sign-in provider
                        identifiers, and session data to authenticate users. When you sign in with Google, Google also
                        processes the information needed to complete that sign-in. Our configured email delivery
                        provider processes recipient addresses and message content to deliver account and service
                        emails; its identity depends on the mail provider configured for the service.
                    </p>
                    <p className="mb-5">
                        Map tile providers receive requests for the map resources shown in your browser through our
                        server proxy. This prevents the tile providers from receiving your browser IP address directly;
                        they still receive the requested tile/style coordinates and may infer the map area being viewed.
                        Our hosting provider receives those requests and the visitor network address.
                    </p>
                    <p className="mb-5">
                        LocationIQ processes text entered in location search and coordinates submitted for reverse
                        geocoding. These requests are sent by our backend, so LocationIQ receives our server network
                        address rather than the visitor IP, along with the query or coordinates needed to provide the
                        requested result.
                    </p>
                    <p>
                        If you accept optional analytics, Google Analytics and Yandex Metrica receive analytics events
                        and may use cookies or similar identifiers. Yandex Metrica session replay is enabled. These
                        providers may process network and device information. Analytics scripts are not loaded unless
                        you accept analytics. You can reject analytics when first asked; the current choice is stored in
                        browser storage and can be changed by clearing that storage.
                    </p>
                </section>

                <section>
                    <h2 className="h5 mb-8">Data Access and Removal</h2>
                    <p>
                        You have the right to&nbsp;request access to&nbsp;the personal data we&nbsp;store about you.
                        Upon your request, we&nbsp;will provide your personal data in&nbsp;a .csv file format.
                        Additionally, you can fully remove your account and all associated data directly from your
                        profile page.
                    </p>
                </section>

                <section>
                    <h2 className="h5 mb-8">Data Security</h2>
                    <p>
                        We&nbsp;take appropriate measures to&nbsp;protect your personal information from unauthorized
                        access, alteration, disclosure, or&nbsp;destruction. We&nbsp;employ industry-standard security
                        practices and encryption techniques to safeguard your data.
                    </p>
                </section>

                <section>
                    <h2 className="h5 mb-8">Children&rsquo;s Privacy</h2>
                    <p>
                        Our platform is&nbsp;not intended for use by&nbsp;individuals under the age of&nbsp;18.
                        We&nbsp;do&nbsp;not knowingly collect personal information from children. If&nbsp;you believe
                        that we&nbsp;have inadvertently collected personal information from a&nbsp;child, please
                        contact&nbsp;us immediately, and we&nbsp;will take steps to&nbsp;delete that information.
                    </p>
                </section>

                <section>
                    <h2 className="h5 mb-8">Changes to&nbsp;the Privacy Policy</h2>
                    <p>
                        We&nbsp;may update this Privacy Policy from time to&nbsp;time. We&nbsp;will notify you
                        of&nbsp;any significant changes by posting the updated Privacy Policy on&nbsp;our platform.
                        Please review this policy periodically for any updates.
                    </p>
                </section>

                <section>
                    <h2 className="h5 mb-8">Contacting&nbsp;us</h2>
                    <p>
                        If&nbsp;you have any questions, concerns, or&nbsp;complaints regarding this Privacy Policy,
                        we&nbsp;encourage you to contact&nbsp;us using the details below: <SupportEmailLink />.
                    </p>
                </section>

                <p>
                    Please note that this privacy policy applies solely to&nbsp;our platform and does not cover any
                    external websites or&nbsp;services that may be&nbsp;linked within our platform.
                </p>

                <p className="text-black-70 text-center">
                    This document was last updated on&nbsp;November&nbsp;19, 2026
                </p>
            </div>
        </article>
    )
}
