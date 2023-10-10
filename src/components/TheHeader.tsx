import Image from 'next/image'
import Link from 'next/link'

import { AuthLink } from '@/components/AuthLink'
import { LanguageChanger } from '@/components/LanguageChanger'

export const TheHeader = async () => {
    return (
        <header className="sticky top-0 z-10 h-20 bg-custom-blue-20">
            <div className="container grid h-full grid-cols-3 items-center">
                <Link href="/map" className="flex justify-start text-custom-blue-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path fillRule="evenodd" d="M2 19.6539L9.10794 22L16.0769 18.0567L22 20.4028V4.40695L15.9231 2L8.89206 5.97837L2 3.70352V19.6539ZM14 16.951L10 19.2143V7.6324L14 5.36908V16.951ZM16 15.8933L20 17.4776V5.74775L16 4.16406V4.23741V15.8933ZM4 18.2265L8 19.5468V7.77146L4 6.45119V18.2265Z" />
                    </svg>
                    On map
                </Link>
                <div className="flex justify-center">
                    <Link href="/">
                        <span className="sr-only">Tripadvancer</span>
                        <Image src="/images/logo-full.svg" width="208" height="28" alt="Tripadvancer" priority />
                    </Link>
                </div>
                <div className="flex justify-end gap-6">
                    {/* <AuthLink /> */}
                    <LanguageChanger />
                </div>
            </div>
        </header>
    )
}
