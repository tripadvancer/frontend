import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="sm:p-16 flex min-h-screen items-center justify-center bg-custom-blue-20 p-4">
            <div className="sm:p-16 box-content flex w-104 flex-col items-center gap-y-8 rounded-2xl bg-white px-8 py-16">
                <Link href="/" className="flex gap-x-2">
                    <Image
                        src="/images/logo-mini.svg"
                        width="32"
                        height="28"
                        alt="Tripadvancer"
                        className="sm:block hidden"
                    />
                    <Image
                        src="/images/logo.svg"
                        width="144"
                        height="24"
                        alt="Tripadvancer"
                        className="sm:h-[28px] sm:w-[168px]"
                    />
                </Link>
                {children}
            </div>
        </div>
    )
}
