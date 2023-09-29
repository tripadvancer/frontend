import Link from 'next/link'

export const TheHeader = () => {
    return (
        <header className="sticky top-0 z-10 flex h-20 items-center bg-custom-blue-20">
            <div className="container">
                <ul className="flex flex-row gap-3">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/map">On map</Link>
                    </li>
                    <li>Sign in</li>
                    <li>Ru</li>
                    <li>En</li>
                </ul>
            </div>
        </header>
    )
}
