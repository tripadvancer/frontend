import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
    return (
        <Link href="/" className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-x-2">
            <Image src="/images/logo-mini.svg" width="32" height="28" alt="Tripadvancer" className="phone:hidden" />
            <Image
                src="/images/logo.svg"
                width="168"
                height="28"
                alt="Tripadvancer"
                className="phone:h-[24px] phone:w-[144px]"
            />
        </Link>
    )
}
