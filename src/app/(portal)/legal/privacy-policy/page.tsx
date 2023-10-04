import Link from 'next/link'
import type { Metadata } from 'next/types'

export const runtime = 'edge'

export const metadata: Metadata = {
    title: 'Privacy Policy | Tripadvancer',
    description: 'Thank you for using our service! This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform. By accessing or using our service, you agree to the terms of this Privacy Policy.'
}

export default function LegalPrivacyPolicy() {
    return (
        <>
            <h1>Privacy Policy</h1>
            <p>Effective Date: July&nbsp;2, 2023</p>

            <p>
                Thank you for using our service! This Privacy Policy explains how we&nbsp;collect, use, and protect your
                personal information when you use our platform. By&nbsp;accessing or&nbsp;using our service, you agree
                to&nbsp;the terms of&nbsp;this Privacy Policy.
            </p>

            <h3>Information We&nbsp;Collect</h3>
            <p>We&nbsp;only collect the following user data:</p>
            <ul>
                <li>
                    Email address: We&nbsp;collect your email address to&nbsp;facilitate communication and account
                    management.
                </li>
                <li>Username: We&nbsp;collect your chosen username for identification purposes within our platform.</li>
                <li>
                    Info: We&nbsp;may collect additional information provided by&nbsp;you, such as&nbsp;an&nbsp;account
                    description, to enhance your user experience.
                </li>
            </ul>
            <p>
                Please note that we&nbsp;do&nbsp;not store any personal images directly on&nbsp;our service. Images
                uploaded by&nbsp;users are stored by&nbsp;a&nbsp;third-party provider, Cloudflare. These images are
                removed from our service upon your request or&nbsp;when you delete them from our platform.
            </p>

            <h3>Use of&nbsp;Personal Information</h3>
            <p>We&nbsp;use the collected information for the following purposes:</p>
            <ul>
                <li>
                    Communication: We&nbsp;may use your email address to&nbsp;communicate with you regarding your
                    account, updates, and relevant information.
                </li>
                <li>
                    Account Management: Your username and account information are used for identification and
                    authentication purposes.
                </li>
                <li>
                    Service Improvement: The information you provide helps&nbsp;us enhance and personalize your user
                    experience within our platform.
                </li>
            </ul>

            <h3>Data Sharing</h3>
            <p>
                We&nbsp;do&nbsp;not share your personal data with third-party services. However, please note that images
                uploaded to&nbsp;our platform are stored on&nbsp;Cloudflare for the purpose of&nbsp;hosting and serving
                the images. Cloudflare acts as&nbsp;a&nbsp;data processor and adheres to&nbsp;stringent security
                measures to&nbsp;protect your information. We&nbsp;do not provide Cloudflare with any personal data
                beyond what is&nbsp;necessary for image storage and delivery. It&rsquo;s important to&nbsp;note that
                while images themselves may not be&nbsp;considered personal information, we handle them with utmost care
                and ensure they are removed from our service once you remove them from your profile.
            </p>

            <h3>Data Access and Removal</h3>
            <p>
                You have the right to&nbsp;request access to&nbsp;the personal data we&nbsp;store about you. Upon your
                request, we&nbsp;will provide your personal data in&nbsp;a .csv file format. Additionally, you can fully
                remove your account and all associated data directly from your profile page.
            </p>

            <h3>Data Security</h3>
            <p>
                We&nbsp;take appropriate measures to&nbsp;protect your personal information from unauthorized access,
                alteration, disclosure, or&nbsp;destruction. We&nbsp;employ industry-standard security practices and
                encryption techniques to safeguard your data.
            </p>

            <h3>Children&rsquo;s Privacy</h3>
            <p>
                Our platform is&nbsp;not intended for use by&nbsp;individuals under the age of&nbsp;18.
                We&nbsp;do&nbsp;not knowingly collect personal information from children. If&nbsp;you believe that
                we&nbsp;have inadvertently collected personal information from a&nbsp;child, please contact&nbsp;us
                immediately, and we&nbsp;will take steps to&nbsp;delete that information.
            </p>

            <h3>Changes to&nbsp;the Privacy Policy</h3>
            <p>
                We&nbsp;may update this Privacy Policy from time to&nbsp;time. We&nbsp;will notify you of&nbsp;any
                significant changes by posting the updated Privacy Policy on&nbsp;our platform. Please review this
                policy periodically for any updates.
            </p>

            <h3>Contacting&nbsp;us</h3>
            <p>
                If&nbsp;you have any questions, concerns, or&nbsp;complaints regarding this Privacy Policy,
                we&nbsp;encourage you to contact&nbsp;us using the details below:{' '}
                <Link href="mailto:support@tripadvancer.me">support@tripadvancer.me</Link>.
            </p>

            <p>
                Please note that this privacy policy applies solely to&nbsp;our platform and does not cover any external
                websites or&nbsp;services that may be&nbsp;linked within our platform.
            </p>

            <p>This document was last updated on&nbsp;July&nbsp;2, 2023</p>
        </>
    )
}
