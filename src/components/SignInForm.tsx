'use client'

import { ForgotPasswordForm } from '@/components/ForgotPasswordForm'
import { SignUpForm } from '@/components/SignUpForm'
import { Button } from '@/components/forms/Button'
import { Input } from '@/components/forms/Input'
import { useDialog } from '@/providers/dialog-provider'
import { useScopedI18n } from '@/utils/i18n.client'

export const SignInForm = () => {
    const t = useScopedI18n('pages.auth.sign_in')
    const tCommon = useScopedI18n('common')
    const tForm = useScopedI18n('forms.fields')
    const dialog = useDialog()

    return (
        <div className="w-96 phone:w-full">
            <h1 className="mb-8 text-center text-lg font-medium">{t('title')}</h1>
            <Input type="text" name="email" placeholder={tForm('email.label')} className="mb-2" />
            <Input type="password" name="password" placeholder={tForm('password.label')} className="mb-2" />
            <div className="mb-2 text-center text-sm">
                <span
                    className="cursor-pointer text-custom-blue-100 transition-colors duration-300 ease-in-out hover:text-custom-blue-active"
                    onClick={() => dialog.setContent(<ForgotPasswordForm />)}
                >
                    {t('link.forgot_password')}
                </span>
            </div>
            <Button type="submit" className="mb-8 w-full">
                {t('submit')}
            </Button>
            <div className="text-center text-sm">
                {t('to_back', {
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
