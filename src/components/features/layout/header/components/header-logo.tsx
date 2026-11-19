import Image from 'next/image'
import Link from 'next/link'

type HeaderLogoProps = {
    closeMobileMenu?: () => void
}

export const HeaderLogo = ({ closeMobileMenu }: HeaderLogoProps) => {
    return (
        <Link href="/" className="flex flex-none" onClick={closeMobileMenu!!}>
            <Image
                src="/images/logo.svg"
                width="187"
                height="32"
                alt="Tripadvancer"
                className="h-6 w-35 sm:h-8 sm:w-46.75"
            />
        </Link>
    )
}
