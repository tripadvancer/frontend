import { setStaticParamsLocale } from 'next-international/server'

import { RessetPassword } from '@/components/auth/resset-password'
import { getStaticParams } from '@/utils/i18n/i18n.server'

export function generateStaticParams() {
    return getStaticParams()
}

export default async function RessetPasswordPage({ params }: { params: { locale: string } }) {
    setStaticParamsLocale(params.locale)
    return <RessetPassword />
}
