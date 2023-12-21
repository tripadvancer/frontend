import { RestoreUser } from '@/components/auth/restore-user'

export default async function RestoreUserPage({ searchParams }: { searchParams: { token: string } }) {
    return <RestoreUser token={searchParams.token} />
}
