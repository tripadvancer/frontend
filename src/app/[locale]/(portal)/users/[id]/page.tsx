import { redirect } from 'next/navigation'

export default async function User({ params }: { params: { id: string } }) {
    redirect(`/users/${params.id}/places`)
}
