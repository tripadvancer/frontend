import Image from 'next/image'
import Link from 'next/link'

type HeaderMobileLogoProps = {
    closeMobileMenu: () => void
}

export const HeaderMobileLogo = ({ closeMobileMenu }: HeaderMobileLogoProps) => {
    return (
        <Link href="/" className="flex flex-none" onClick={closeMobileMenu}>
            <Image src="/images/logo.svg" width="187" height="32" alt="Tripadvancer" className="h-[24px] w-[140px]" />
        </Link>
    )
}
