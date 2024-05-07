'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { sendVerificationEmail } from 'supertokens-web-js/recipe/emailverification'
import { emailPasswordSignUp } from 'supertokens-web-js/recipe/thirdpartyemailpassword'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import type { SignUpInputs } from '@/utils/types/auth'

import { Devider } from '@/components/ui/devider'
import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { SignIn } from './sign-in'
import { SignUpCompleting } from './sign-up-completing'
import { ThirdPartyButton } from './third-party-button'

const userNameMinLength = validationConfig.user.name.minLength
const userNameMaxLength = validationConfig.user.name.maxLength
const userPasswordMinLength = validationConfig.user.password.minLength

export const SignUp = () => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const initialValues = {
        email: '',
        username: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(t('validation.required'))
            .matches(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
                t('validation.email.invalid'),
            ),
        username: Yup.string()
            .required(t('validation.required'))
            .min(userNameMinLength, t('validation.text.min_length', { min_length: userNameMinLength }))
            .max(userNameMaxLength, t('validation.text.max_length', { max_length: userNameMaxLength })),
        password: Yup.string()
            .required(t('validation.required'))
            .min(userPasswordMinLength, t('validation.text.min_length', { min_length: userPasswordMinLength }))
            .matches(/^(?=.*[a-z])(?=.*[0-9])/g, t('validation.password.policy_violated')),
    })

    const handleSubmit = async (values: SignUpInputs) => {
        try {
            setIsLoading(true)
            const formFields = [
                { id: 'email', value: values.email },
                { id: 'password', value: values.password },
                { id: 'username', value: values.username },
            ]
            const response = await emailPasswordSignUp({ formFields })

            switch (response.status) {
                case 'OK':
                    await sendVerificationEmail()
                    router.refresh()
                    dialog.open(<SignUpCompleting />)
                    break

                case 'FIELD_ERROR':
                    const emailError = response.formFields.find(formField => formField.id === 'email')
                    const passwordError = response.formFields.find(formField => formField.id === 'password')
                    const usernameError = response.formFields.find(formField => formField.id === 'username')

                    if (emailError) {
                        // todo: try to find a better way to handle this
                        if (emailError.error === 'This email already exists. Please sign in instead.') {
                            formik.setErrors({ email: t('validation.email.already_exists') })
                        } else {
                            formik.setErrors({ email: emailError.error })
                        }
                    }

                    if (passwordError) {
                        formik.setErrors({ email: passwordError.error })
                    }

                    if (usernameError) {
                        if (usernameError.error === 'USERNAME_ALREADY_EXISTS_ERROR') {
                            formik.setErrors({ username: t('validation.username.already_exists') })
                        }
                    }
                    break

                default:
                    toast.error(t('common.error'))
                    break
            }
        } catch (err: any) {
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignInClick = () => {
        dialog.open(<SignIn />)
    }

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
        onSubmit: handleSubmit,
    })

    return (
        <form className="flex w-full flex-col gap-y-8 sm:w-104" onSubmit={formik.handleSubmit}>
            <h1 className="h7 text-center">{t('auth.signup.title')}</h1>
            <div className="flex flex-col gap-y-4">
                <div className="flex gap-x-2">
                    <ThirdPartyButton provider="google" isDisabled={isLoading} />
                    {/* <ThirdPartyButton provider="facebook" isDisabled={isLoading} /> */}
                </div>
                <Devider>{t('auth.signin.third_party.or')}</Devider>
                <div className="flex flex-col gap-y-2">
                    <FormInput
                        type="text"
                        name="email"
                        value={formik.values.email}
                        placeholder={t('placeholder.email')}
                        autoFocus
                        error={formik.errors.email}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                    <FormInput
                        type="text"
                        name="username"
                        value={formik.values.username}
                        placeholder={t('placeholder.username')}
                        error={formik.errors.username}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={formik.values.password}
                        placeholder={t('placeholder.password')}
                        error={formik.errors.password}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <FormButton htmlType="submit" className="w-full" isLoading={isLoading}>
                    {t('auth.signup.submit')}
                </FormButton>
                <div className="text-center text-small text-black-40">
                    {t('auth.signup.info', {
                        terms_link: (
                            <span
                                className="link"
                                onClick={() => {
                                    dialog.close()
                                    router.push('/legal/terms-and-conditions')
                                }}
                            >
                                {t('common.link.terms')}
                            </span>
                        ),
                        privacy_link: (
                            <span
                                className="link"
                                onClick={() => {
                                    dialog.close()
                                    router.push('/legal/privacy-policy')
                                }}
                            >
                                {t('common.link.privacy')}
                            </span>
                        ),
                    })}
                </div>
            </div>
            <div className="text-center">
                {t('auth.signup.to_back', {
                    sign_in_link: (
                        <span className="link" onClick={handleSignInClick}>
                            {t('common.link.sign_in')}
                        </span>
                    ),
                })}
            </div>
        </form>
    )
}
