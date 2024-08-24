import { useTranslations } from 'next-intl'

import { AuthCompleting } from './auth-completing'

export const SignUpCompleting = () => {
    const t = useTranslations()

    return <AuthCompleting title={t('auth.signupCompleting.title')} text={t('auth.signupCompleting.text')} />
}
