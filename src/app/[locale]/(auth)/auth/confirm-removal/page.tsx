import { ConfirmUserRemoval } from '@/components/auth/confirm-user-removal'

export default async function ConfirmUserRemovalPage({ searchParams }: { searchParams: { token: string } }) {
    return <ConfirmUserRemoval token={searchParams.token} />
}
