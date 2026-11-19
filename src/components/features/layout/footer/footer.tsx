import Link from 'next/link'

export const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="relative container">
                <div className="border-black-70 flex flex-col items-center gap-y-4 border-t py-8 sm:flex-row sm:justify-between">
                    <div className="text-center">
                        <div className="text-black-40">© Tripadvancer, 2026</div>
                    </div>

                    <div className="flex flex-col sm:gap-y-1">
                        <nav className="text-black-40 flex flex-col items-center gap-y-2 sm:flex-row sm:gap-x-2 sm:gap-y-0">
                            <Link href="/legal/terms-and-conditions">Terms and Conditions</Link>
                            <span className="hidden sm:block">•</span>
                            <Link href="/legal/privacy-policy">Privacy Policy</Link>
                            <span className="hidden sm:block">•</span>
                            <Link href="/legal/cookie-policy">Cookie Policy</Link>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}
