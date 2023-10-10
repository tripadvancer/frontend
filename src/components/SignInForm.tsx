'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import type { AuthResponse } from '@/types/auth'

import { Button } from '@/components/Button'
import { ForgotPasswordForm } from '@/components/ForgotPasswordForm'
import { Input } from '@/components/Input'
import { SignUpForm } from '@/components/SignUpForm'
import { useDialog } from '@/providers/DialogProvider'
import { useToast } from '@/providers/ToastProvider'
import { setCredentials } from '@/redux/features/userSlice'
import { useAppDispatch } from '@/redux/hooks'
import { authAPI } from '@/redux/services/authAPI'
import { useI18n } from '@/utils/i18n.client'

export const SignInForm = () => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()
    const dispatch = useAppDispatch()

    const [signIn, { isLoading, isError, error }] = authAPI.useSignInMutation()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .required(t('forms.validation.email.required'))
                .email(t('forms.validation.email.invalid')),
            password: Yup.string().required(t('forms.validation.password.required')),
        }),
        onSubmit: async values => {
            await signIn(values)
                .unwrap()
                .then((response: AuthResponse) => {
                    dispatch(setCredentials(response))
                    toast.success(t('common.signin.success', { name: response.user.name }))
                    dialog.unsetContent()
                })
                .catch(err => {
                    console.log(err)
                    // const reason = getErrorMessage(err)
                    // if (Object.values(ApiErrorReason).includes(reason)) {
                    // unSetDialogContent()
                    // setDialogContent(<VerifyFeedback reason={getErrorMessage(rejected)} />)
                    // }
                })
        },
    })

    return (
        <form className="w-96 phone:w-full" onSubmit={formik.handleSubmit}>
            <h1 className="mb-8 text-center text-lg font-medium">{t('dialogs.sign_in.title')}</h1>
            <Input
                type="text"
                name="email"
                value={formik.values.email}
                placeholder={t('forms.fields.email.placeholder')}
                className="mb-2"
                error={formik.errors.email}
                onChange={formik.handleChange}
            />
            <Input
                type="password"
                name="password"
                value={formik.values.password}
                placeholder={t('forms.fields.password.placeholder')}
                className="mb-2"
                error={formik.errors.password}
                onChange={formik.handleChange}
            />
            <div className="mb-2 text-center text-sm">
                <span
                    className="cursor-pointer text-custom-blue-100 transition-colors duration-300 ease-in-out hover:text-custom-blue-active"
                    onClick={() => dialog.setContent(<ForgotPasswordForm />)}
                >
                    {t('dialogs.sign_in.link.forgot_password')}
                </span>
            </div>
            <Button type="submit" className="mb-8 w-full">
                {t('dialogs.sign_in.submit')}
            </Button>
            <div className="text-center text-sm">
                {t('dialogs.sign_in.to_back', {
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
