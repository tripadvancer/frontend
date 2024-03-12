import { ConfirmUserDeletion } from '@/components/features/auth/confirm-user-deletion'

export default async function ConfirmUserDeletionPage({ searchParams }: { searchParams: { token: string } }) {
    return <ConfirmUserDeletion token={searchParams.token} />
}
