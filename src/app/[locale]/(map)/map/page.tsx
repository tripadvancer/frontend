import Link from 'next/link'

export const runtime = 'edge'

export default function Map() {
    return (
        <div>
            Map
            <div>
                <Link href="/places/70">Place 70</Link>
            </div>
        </div>
    )
}
