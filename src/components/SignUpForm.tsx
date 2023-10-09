'use client'

import Link from 'next/link'

import { Button } from '@/components/forms/Button'
import { Input } from '@/components/forms/Input'
import { useDialog } from '@/providers/dialog-provider'
import { useScopedI18n } from '@/utils/i18n.client'

import { SignInForm } from './SignInForm'

export const SignUpForm = () => {
    const t = useScopedI18n('pages.auth.sign_up')
    const tCommon = useScopedI18n('common')
    const tForm = useScopedI18n('forms.fields')
    const dialog = useDialog()

    return (
        <div className="w-96 phone:w-full">
            <h1 className="mb-8 text-center text-lg font-medium">{t('title')}</h1>
            <Input type="text" name="email" placeholder={tForm('email.label')} className="mb-2" />
            <Input type="password" name="username" placeholder={tForm('username.label')} className="mb-2" />
            <Input type="password" name="password" placeholder={tForm('password.label')} className="mb-2" />
            <Button type="submit" className="mb-4 w-full">
                {t('submit')}
            </Button>
            <div className="mb-8 text-center text-sm text-custom-black-40">
                {t('info', {
                    terms_link: (
                        <Link href="/legal/terms-and-conditions" className="text-custom-blue-100">
                            {tCommon('terms_link')}
                        </Link>
                    ),
                    privacy_link: (
                        <Link href="/legal/privacy-policy" className="text-custom-blue-100">
                            {tCommon('privacy_link')}
                        </Link>
                    ),
                })}
            </div>
            <div className="text-center text-sm">
                {t('to_back', {
                    sign_in_link: (
                        <span
                            className="cursor-pointer text-custom-blue-100 transition-colors duration-300 ease-in-out hover:text-custom-blue-active"
                            onClick={() => dialog.setContent(<SignInForm />)}
                        >
                            {tCommon('sign_in_link')}
                        </span>
                    ),
                })}
            </div>
        </div>
    )
}
