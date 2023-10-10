'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { SignInForm } from '@/components/SignInForm'
import { SignUpForm } from '@/components/SignUpForm'
import { useDialog } from '@/providers/DialogProvider'
import { useI18n } from '@/utils/i18n.client'

export const ForgotPasswordForm = () => {
    const t = useI18n()
    const dialog = useDialog()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .required(t('forms.validation.email.required'))
                .email(t('forms.validation.email.invalid')),
        }),
        onSubmit: async values => {
            console.log(values)
        },
    })

    return (
        <form className="w-96 phone:w-full" onSubmit={formik.handleSubmit}>
            <h1 className="mb-8 text-center text-lg font-medium">{t('dialogs.forgot_password.title')}</h1>
            <p className="mb-2 text-center text-sm">{t('dialogs.forgot_password.info')}</p>
            <Input
                type="text"
                name="email"
                value={formik.values.email}
                placeholder={t('forms.fields.email.placeholder')}
                className="mb-2"
                error={formik.errors.email}
                onChange={formik.handleChange}
            />
            <Button type="submit" className="mb-8 w-full">
                {t('dialogs.forgot_password.submit')}
            </Button>
            <div className="text-center text-sm">
                {t('dialogs.forgot_password.to_back', {
                    sign_in_link: (
                        <span
                            className="cursor-pointer text-custom-blue-100 transition-colors duration-300 ease-in-out hover:text-custom-blue-active"
                            onClick={() => dialog.setContent(<SignInForm />)}
                        >
                            {t('common.sign_in_link')}
                        </span>
                    ),
                    sign_up_link: (
                        <span
                            className="cursor-pointer text-custom-blue-100 transition-colors duration-300 ease-in-out hover:text-custom-blue-active"
                            onClick={() => dialog.setContent(<SignUpForm />)}
                        >
                            {t('common.sign_up_link')}
                        </span>
                    ),
                })}
            </div>
        </form>
    )
}
