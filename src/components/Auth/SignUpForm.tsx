'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import Link from 'next/link'

import { SignInForm } from '@/components/Auth/SignInForm'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/DialogProvider'
import { getErrorMessage } from '@/redux/helpers'
import { authAPI } from '@/redux/services/authAPI'
import { ApiErrorReason } from '@/utils/enums'
import { useI18n } from '@/utils/i18n.client'

import { SignInFeedback } from './SignInFeedback'

const userNameMinLength = validationConfig.user.name.minLength
const userNameMaxLength = validationConfig.user.name.maxLength
const passwordMinLength = validationConfig.user.password.minLength
const passwordMaxLength = validationConfig.user.password.maxLength

export const SignUpForm = () => {
    const t = useI18n()
    const dialog = useDialog()

    const [signUp, { isLoading }] = authAPI.useSignUpMutation()

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .required(t('forms.validation.email.required'))
                .email(t('forms.validation.email.invalid')),
            name: Yup.string()
                .required(t('forms.validation.username.required'))
                .min(userNameMinLength, t('forms.validation.username.min_length', { min_length: userNameMinLength }))
                .max(userNameMaxLength, t('forms.validation.username.max_length', { max_length: userNameMaxLength })),
            password: Yup.string()
                .required(t('forms.validation.password.required'))
                .min(passwordMinLength, t('forms.validation.password.min_length', { min_length: passwordMinLength }))
                .max(passwordMaxLength, t('forms.validation.password.max_length', { max_length: passwordMaxLength })),
        }),
        onSubmit: async values => {
            try {
                await signUp(values).unwrap()
                dialog.close()
                dialog.open(<SignInFeedback reason={ApiErrorReason.ACCOUNT_NOT_ACTIVATED} />)
            } catch (err) {}
        },
    })

    return (
        <form className="w-104 phone:w-full" onSubmit={formik.handleSubmit}>
            <h1 className="mb-8 text-center text-lg font-medium">{t('dialogs.sign_up.title')}</h1>
            <Input
                type="text"
                name="email"
                value={formik.values.email}
                placeholder={t('forms.fields.email.placeholder')}
                error={formik.errors.email}
                className="mb-2"
                onChange={formik.handleChange}
            />
            <Input
                type="text"
                name="name"
                value={formik.values.name}
                placeholder={t('forms.fields.username.placeholder')}
                error={formik.errors.name}
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
                {t('dialogs.sign_up.submit')}
            </Button>
            <div className="mb-8 text-center text-xs text-custom-black-40">
                {t('dialogs.sign_up.info', {
                    terms_link: (
                        <Link href="/legal/terms-and-conditions" className="text-custom-blue-100">
                            {t('common.terms_link')}
                        </Link>
                    ),
                    privacy_link: (
                        <Link href="/legal/privacy-policy" className="text-custom-blue-100">
                            {t('common.privacy_link')}
                        </Link>
                    ),
                })}
            </div>
            <div className="text-center text-sm">
                {t('dialogs.sign_up.to_back', {
                    sign_in_link: (
                        <span
                            className="cursor-pointer text-custom-blue-100 transition-colors duration-300 ease-in-out hover:text-custom-blue-active"
                            onClick={() => dialog.open(<SignInForm />)}
                        >
                            {t('common.sign_in_link')}
                        </span>
                    ),
                })}
            </div>
        </form>
    )
}
