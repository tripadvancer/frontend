import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-custom-blue-20 p-16 phone:p-4">
            <div className="w-104 box-content flex flex-col items-center gap-y-8 rounded-2xl bg-white p-16 phone:px-8 phone:py-16">
                <Link href="/" className="flex gap-x-2">
                    <Image
                        src="/images/logo-mini.svg"
                        width="32"
                        height="28"
                        alt="Tripadvancer"
                        className="phone:hidden"
                    />
                    <Image
                        src="/images/logo.svg"
                        width="168"
                        height="28"
                        alt="Tripadvancer"
                        className="phone:h-[24px] phone:w-[144px]"
                    />
                </Link>
                {children}
            </div>
        </div>
    )
}
