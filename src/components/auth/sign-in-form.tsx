'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { setCredentials } from '@/redux/features/user-slice'
import { getErrorMessage } from '@/redux/helpers'
import { useAppDispatch } from '@/redux/hooks'
import { authAPI } from '@/redux/services/auth-api'
import { ApiErrorReason } from '@/utils/enums'
import { useI18n } from '@/utils/i18n.client'

import { ForgotPasswordForm } from './forgot-password-form'
import { SignInFeedback } from './sign-in-feedback'
import { SignUpForm } from './sign-up-form'

export const SignInForm = () => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const dialog = useDialog()
    const toast = useToast()

    const [signIn, { isLoading }] = authAPI.useSignInMutation()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(t('forms.validation.required')).email(t('forms.validation.email.invalid')),
            password: Yup.string().required(t('forms.validation.required')),
        }),
        onSubmit: async values => {
            try {
                const response = await signIn(values).unwrap()
                dispatch(setCredentials(response))
                toast.success(t('common.signin.success', { name: response.user.name }))
                dialog.close()
            } catch (err) {
                const reason = getErrorMessage(err)
                if (Object.values(ApiErrorReason).includes(reason)) {
                    dialog.close()
                    dialog.open(<SignInFeedback reason={reason} />)
                } else {
                    toast.error(reason)
                }
            }
        },
    })

    return (
        <form className="w-full sm:w-104" onSubmit={formik.handleSubmit}>
            <h1 className="mb-8 text-center text-h7-m sm:text-h7">{t('dialogs.sign_in.title')}</h1>
            <Input
                type="text"
                name="email"
                value={formik.values.email}
                placeholder={t('forms.fields.email.placeholder')}
                autoFocus
                error={formik.errors.email}
                className="mb-2"
                onChange={formik.handleChange}
            />
            <Input
                type="password"
                name="password"
                value={formik.values.password}
                placeholder={t('forms.fields.password.placeholder')}
                error={formik.errors.password}
                className="mb-8"
                onChange={formik.handleChange}
            />
            <Button type="submit" className="mb-4 w-full" isDisabled={isLoading}>
                {t('dialogs.sign_in.submit')}
            </Button>
            <div className="mb-8 text-center text-small">
                <span
                    className="hover-animated cursor-pointer text-small text-blue-100 hover:text-blue-active"
                    onClick={() => dialog.open(<ForgotPasswordForm />)}
                >
                    {t('dialogs.sign_in.link.forgot_password')}
                </span>
            </div>
            <div className="text-center ">
                {t('dialogs.sign_in.to_back', {
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
