import { User } from '@/components/features/user/user'

export default function UserLayout({ params, children }: { params: { id: string }; children: React.ReactNode }) {
    return <User userId={params.id}>{children}</User>
}
