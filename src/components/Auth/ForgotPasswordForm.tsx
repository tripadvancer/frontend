'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { ForgotPasswordFeedback } from '@/components/Auth/ForgotPasswordFeedback'
import { SignInForm } from '@/components/Auth/SignInForm'
import { SignUpForm } from '@/components/Auth/SignUpForm'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useDialog } from '@/providers/DialogProvider'
import { useToast } from '@/providers/ToastProvider'
import { getErrorMessage } from '@/redux/helpers'
import { authAPI } from '@/redux/services/authAPI'
import { useI18n } from '@/utils/i18n.client'

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
            email: Yup.string()
                .required(t('forms.validation.email.required'))
                .email(t('forms.validation.email.invalid')),
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
        <form className="w-104 phone:w-full" onSubmit={formik.handleSubmit}>
            <h1 className="mb-8 text-center text-lg font-medium">{t('dialogs.forgot_password.title')}</h1>
            <p className="mb-2 text-center text-sm">{t('dialogs.forgot_password.info')}</p>
            <Input
                type="text"
                name="email"
                value={formik.values.email}
                placeholder={t('forms.fields.email.placeholder')}
                error={formik.errors.email}
                className="mb-8"
                onChange={formik.handleChange}
            />
            <Button type="submit" className="mb-8 w-full" isDisabled={isLoading}>
                {t('dialogs.forgot_password.submit')}
            </Button>
            <div className="text-center text-sm">
                {t('dialogs.forgot_password.to_back', {
                    sign_in_link: (
                        <span
                            className="cursor-pointer text-custom-blue-100 transition-colors duration-300 ease-in-out hover:text-custom-blue-active"
                            onClick={() => dialog.open(<SignInForm />)}
                        >
                            {t('common.sign_in_link')}
                        </span>
                    ),
                    sign_up_link: (
                        <span
                            className="cursor-pointer text-custom-blue-100 transition-colors duration-300 ease-in-out hover:text-custom-blue-active"
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
