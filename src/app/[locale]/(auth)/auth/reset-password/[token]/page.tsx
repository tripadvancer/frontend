import { RessetPasswordForm } from '@/components/auth/resset-password-form'

export default async function RessetPassword({ params }: { params: { token: string } }) {
    return <RessetPasswordForm token={params.token} />
}
