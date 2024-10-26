import { redirect } from 'next/navigation'

export default function UserPage({ params }: { params: { username: string } }) {
    redirect(`/users/${params.username}/visited`)
}
