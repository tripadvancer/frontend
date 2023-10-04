import { notFound } from 'next/navigation'

export const runtime = 'edge'

export default function NotFoundDummy() {
    notFound()
}
