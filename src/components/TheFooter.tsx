import Link from 'next/link'

export const TheFooter = () => {
    return (
        <footer className="py-4">
            <div className="container">
                <nav>
                    <ul className="flex flex-row items-center justify-center gap-3">
                        <li>
                            <Link href="/legal/terms-and-conditions">Terms and conditions</Link>
                        </li>
                        <li>
                            <Link href="/legal/privacy-policy">Privacy policy</Link>
                        </li>
                        <li>
                            <Link href="/legal/cookie-policy">Cookie policy</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}
