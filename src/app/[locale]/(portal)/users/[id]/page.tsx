import { redirect } from 'next/navigation'

export default async function UserPage({ params }: { params: { id: string } }) {
    redirect(`/users/${params.id}/places`)
}
