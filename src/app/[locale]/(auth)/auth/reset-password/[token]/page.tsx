import { RessetPasswordForm } from '@/components/Auth/RessetPasswordForm'

export default async function RessetPassword({ params }: { params: { token: string } }) {
    return <RessetPasswordForm token={params.token} />
}
