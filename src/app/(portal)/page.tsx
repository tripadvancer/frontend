import Link from 'next/link'

export default function Portal() {
    return (
        <>
            <h1>Countries</h1>
            <ul>
                <li>
                    <Link href="/countries/lt">Lituenia</Link>
                </li>
                <li>
                    <Link href="/countries/lv">Latvia</Link>
                </li>
                <li>
                    <Link href="/countries/pl">Poland</Link>
                </li>
            </ul>
        </>
    )
}
