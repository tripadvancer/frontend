'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { getErrorMessage } from '@/redux/helpers'
import { authAPI } from '@/redux/services/auth-api'
import { useI18n } from '@/utils/i18n.client'

import { ForgotPasswordFeedback } from './forgot-password-feedback'
import { SignInForm } from './sign-in-form'
import { SignUpForm } from './sign-up-form'

export const ForgotPasswordForm = () => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()

    const [forgotPassword, { isLoading }] = authAPI.useForgotPasswordMutation()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(t('forms.validation.required')).email(t('forms.validation.email.invalid')),
        }),
        onSubmit: async values => {
            try {
                await forgotPassword(values).unwrap()
                dialog.close()
                dialog.open(<ForgotPasswordFeedback />)
            } catch (err) {
                toast.error(getErrorMessage(err))
            }
        },
    })

    return (
        <form className="w-full sm:w-104" onSubmit={formik.handleSubmit}>
            <h1 className="mb-8 text-center text-h7 sm:text-h7-m">{t('dialogs.forgot_password.title')}</h1>
            <p className="mb-2 text-center ">{t('dialogs.forgot_password.info')}</p>
            <Input
                type="text"
                name="email"
                value={formik.values.email}
                placeholder={t('forms.fields.email.placeholder')}
                autoFocus
                error={formik.errors.email}
                className="mb-8"
                onChange={formik.handleChange}
            />
            <Button type="submit" className="mb-8 w-full" isDisabled={isLoading}>
                {t('dialogs.forgot_password.submit')}
            </Button>
            <div className="text-center ">
                {t('dialogs.forgot_password.to_back', {
                    sign_in_link: (
                        <span
                            className="hover-animated cursor-pointer text-blue-100 hover:text-blue-active"
                            onClick={() => dialog.open(<SignInForm />)}
                        >
                            {t('common.sign_in_link')}
                        </span>
                    ),
                    sign_up_link: (
                        <span
                            className="hover-animated cursor-pointer text-blue-100 hover:text-blue-active"
                            onClick={() => dialog.open(<SignUpForm />)}
                        >
                            {t('common.sign_up_link')}
                        </span>
                    ),
                })}
            </div>
        </form>
    )
}
