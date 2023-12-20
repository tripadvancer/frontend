import { setStaticParamsLocale } from 'next-international/server'

import { VerifyEmail } from '@/components/auth/verify-email'
import { getStaticParams } from '@/utils/i18n/i18n.server'

export function generateStaticParams() {
    return getStaticParams()
}

export default async function VerifyEmailPage({ params }: { params: { locale: string } }) {
    setStaticParamsLocale(params.locale)
    return <VerifyEmail />
}
