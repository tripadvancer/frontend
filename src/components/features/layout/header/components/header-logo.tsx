import Image from 'next/image'
import Link from 'next/link'

export const HeaderLogo = () => {
    return (
        <Link href="/" className="flex flex-none">
            {/* <Image src="/images/logo-mini.svg" width="32" height="28" alt="Tripadvancer" className="hidden md:block" /> */}
            <Image
                src="/images/logo.svg"
                width="187"
                height="32"
                alt="Tripadvancer"
                className="h-[24px] w-[140px] sm:h-[32px] sm:w-[187px]"
            />
        </Link>
    )
}
