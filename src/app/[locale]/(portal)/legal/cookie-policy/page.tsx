import Link from 'next/link'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
    title: 'Cookie Policy | Tripadvancer',
    description:
        'This Cookie Policy explains how Tripadvancer («we,» «us,» or «our») uses cookies and similar tracking technologies when you access or use our web service. By using our web service, you consent to the use of cookies as described in this policy.',
}

export default function LegalCookiePolicy() {
    return (
        <article className="inner-container text-sm">
            <h1 className="sm:text-5xl mb-4 text-center text-4xl font-medium">Cookie Policy</h1>

            <article className="mb-16 text-center text-custom-black-70">
                <p className="mb-5">
                    This Cookie Policy explains how Tripadvancer (&laquo;we,&raquo;&nbsp;&laquo;us,&raquo;
                    or&nbsp;&laquo;our&raquo;) uses cookies and similar tracking technologies when you access
                    or&nbsp;use our web service. By&nbsp;using our web service, you consent to&nbsp;the use of cookies
                    as&nbsp;described in&nbsp;this policy.
                </p>
                <p className="font-medium">Effective Date: July&nbsp;2, 2023</p>
            </article>

            <article className="mb-16">
                <h2 className="sm:text-2xl mb-8 text-xl font-medium">What are Cookies?</h2>
                <p>
                    Cookies are small text files that are placed on&nbsp;your device (e.g., computer, smartphone,
                    or&nbsp;tablet) when you visit a&nbsp;website. They are widely used to&nbsp;make websites work
                    or&nbsp;to&nbsp;improve their efficiency, as&nbsp;well as&nbsp;to&nbsp;provide information
                    to&nbsp;the website owners.
                </p>
            </article>

            <article className="mb-16">
                <h2 className="sm:text-2xl mb-8 text-xl font-medium">How We&nbsp;Use Cookies</h2>
                <p className="mb-5">We&nbsp;use cookies for the following purposes:</p>
                <ol className="list-outside list-decimal pl-12">
                    <li className="mb-3">
                        <strong className="font-medium">Essential Cookies:</strong> These cookies are necessary for the
                        operation of&nbsp;our web service. They enable you to&nbsp;navigate the website and use its
                        features, such as&nbsp;accessing secure areas. Without these cookies, certain services may not
                        be&nbsp;available to&nbsp;you.
                    </li>
                    <li className="mb-3">
                        <strong className="font-medium">Analytics Cookies:</strong> We&nbsp;use analytics cookies
                        to&nbsp;collect information about how visitors use our web service. This data helps&nbsp;us
                        analyze website traffic, improve our services, and enhance user experience. The information
                        collected is&nbsp;aggregated and anonymous, and it&nbsp;does not identify individual users.
                    </li>
                    <li className="mb-3">
                        <strong className="font-medium">Advertising Cookies:</strong> We&nbsp;may use advertising
                        cookies to&nbsp;deliver personalized advertisements to&nbsp;you based on&nbsp;your interests.
                        These cookies track your browsing activities across different websites and may be&nbsp;used
                        to&nbsp;build a&nbsp;profile of&nbsp;your preferences. This allows&nbsp;us to&nbsp;show you
                        relevant ads and measure the effectiveness of&nbsp;our advertising campaigns.
                    </li>
                    <li>
                        <strong className="font-medium">Third-Party Cookies:</strong> We&nbsp;may allow third-party
                        service providers to&nbsp;place cookies on&nbsp;your device. These cookies are not under our
                        control, and their use is&nbsp;subject to&nbsp;the third party&rsquo;s privacy policy.
                        We&nbsp;recommend reviewing the privacy policies of&nbsp;these third parties for more
                        information about their cookie practices.
                    </li>
                </ol>
            </article>

            <article className="mb-16">
                <h2 className="sm:text-2xl mb-8 text-xl font-medium">Your Cookie Choices</h2>
                <p>
                    Most web browsers automatically accept cookies, but you can usually modify your browser settings to
                    decline cookies or&nbsp;to&nbsp;alert you when a&nbsp;cookie is&nbsp;being sent. However, please
                    note that if&nbsp;you disable or reject cookies, some features of&nbsp;our web service may not
                    function properly.
                </p>
            </article>

            <article className="mb-16">
                <h2 className="sm:text-2xl mb-8 text-xl font-medium">Managing Cookies</h2>
                <p>
                    You can manage your cookie preferences by&nbsp;adjusting the settings in&nbsp;your web browser. Each
                    browser has different methods for managing cookies, so&nbsp;please refer to&nbsp;the instructions
                    provided by&nbsp;your browser&rsquo;s manufacturer. You can also visit{' '}
                    <Link href="https://www.allaboutcookies.org" target="_blank" className="text-custom-blue-100">
                        www.allaboutcookies.org
                    </Link>{' '}
                    for more information on&nbsp;how to&nbsp;manage and delete cookies.
                </p>
            </article>

            <article className="mb-16">
                <h2 className="sm:text-2xl mb-8 text-xl font-medium">Updates to&nbsp;this Cookie Policy</h2>
                <p>
                    We&nbsp;may update this Cookie Policy from time to&nbsp;time to&nbsp;reflect changes in&nbsp;our
                    practices or&nbsp;for other operational, legal, or&nbsp;regulatory reasons. We&nbsp;encourage you
                    to&nbsp;review this policy periodically to&nbsp;stay informed about our use of&nbsp;cookies.
                </p>
            </article>

            <article className="mb-16">
                <h2 className="sm:text-2xl mb-8 text-xl font-medium">Contacting&nbsp;us</h2>
                <p>
                    If&nbsp;you have any questions, concerns, or&nbsp;complaints regarding this Cookie Policy,
                    we&nbsp;encourage you to contact&nbsp;us using the details below:{' '}
                    <Link href="mailto:support@tripadvancer.me" className="text-custom-blue-100">
                        support@tripadvancer.me
                    </Link>
                    .
                </p>
            </article>

            <p className="text-center text-base text-custom-black-70">
                This document was last updated on&nbsp;July&nbsp;2, 2023
            </p>
        </article>
    )
}
