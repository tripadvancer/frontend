import Image from 'next/image'
import Link from 'next/link'

export const HeaderLogo = () => {
    return (
        <Link href="/" className="flex flex-none">
            {/* <Image src="/images/logo-mini.svg" width="32" height="28" alt="Tripadvancer" className="hidden md:block" /> */}
            <Image src="/images/logo.svg" width="140" height="24" alt="Tripadvancer" />
        </Link>
    )
}
