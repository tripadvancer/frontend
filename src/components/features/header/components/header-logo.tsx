import Image from 'next/image'
import Link from 'next/link'

export const HeaderLogo = () => {
    return (
        <Link href="/" className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-x-2">
            <Image src="/images/logo-mini.svg" width="32" height="28" alt="Tripadvancer" className="hidden md:block" />
            <Image
                src="/images/logo.svg"
                width="144"
                height="24"
                alt="Tripadvancer"
                className="sm:h-[28px] sm:w-[168px]"
            />
        </Link>
    )
}
