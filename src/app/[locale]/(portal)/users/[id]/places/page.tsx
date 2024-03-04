import { UserPlaces } from '@/components/features/user-places/user-places'

export default function UserPlacesPage({ params }: { params: { id: string } }) {
    return <UserPlaces userId={parseInt(params.id)} />
}
