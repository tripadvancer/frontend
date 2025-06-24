import Image from 'next/image'
import Link from 'next/link'

export const HeaderLogo = () => {
    return (
        <Link href="/" className="flex-none">
            <Image src="/images/logo.svg" width="140" height="24" alt="Tripadvancer" />
        </Link>
    )
}
