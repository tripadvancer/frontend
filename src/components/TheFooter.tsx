import Link from 'next/link'

export const TheFooter = async () => {
    return (
        <footer>
            <div className="container border-t border-custom-black-70 py-8">
                <section className="mb-5 text-center text-sm text-custom-black-70">
                    <h4 className="mb-1 font-medium">Planing a trip but don’t know where to go?</h4>
                    <p>
                        Tripadvancer will help you discover the world in a new way, find interesting places and go on an
                        amazing trip.
                    </p>
                    <p>
                        Share your favorite places and experiences with others. Together, we can make every journey even
                        more interesting and exciting.
                    </p>
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
