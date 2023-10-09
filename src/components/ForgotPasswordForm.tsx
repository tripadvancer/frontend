'use client'

import { Button } from '@/components/forms/Button'
import { Input } from '@/components/forms/Input'
import { useDialog } from '@/providers/dialog-provider'
import { useScopedI18n } from '@/utils/i18n.client'

import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'

export const ForgotPasswordForm = () => {
    const t = useScopedI18n('pages.auth.forgot_password')
    const tCommon = useScopedI18n('common')
    const tForm = useScopedI18n('forms.fields')
    const dialog = useDialog()

    return (
        <div className="w-96 phone:w-full">
            <h1 className="mb-8 text-center text-lg font-medium">{t('title')}</h1>
            <p className="mb-2 text-center text-sm">{t('info')}</p>
            <Input type="text" name="email" placeholder={tForm('email.label')} className="mb-2" />
            <Button type="submit" className="mb-8 w-full">
                {t('submit')}
            </Button>
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
                    sign_up_link: (
                        <span
                            className="cursor-pointer text-custom-blue-100 transition-colors duration-300 ease-in-out hover:text-custom-blue-active"
                            onClick={() => dialog.setContent(<SignUpForm />)}
                        >
                            {tCommon('sign_up_link')}
                        </span>
                    ),
                })}
            </div>
        </div>
    )
}
