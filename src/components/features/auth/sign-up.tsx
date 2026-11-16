'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { sendVerificationEmail } from 'supertokens-web-js/recipe/emailverification'
import { emailPasswordSignUp } from 'supertokens-web-js/recipe/thirdpartyemailpassword'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import { useDialog } from '@/components/providers/dialog-provider'
import { useAppSettings } from '@/components/providers/settings-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Devider } from '@/components/ui/devider'
import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { SignUpInputs } from '@/utils/types/auth'
import { waitForSuperTokensInitialization } from '@/utils/supertokens/supertokens.initialization'

import { SignIn } from './sign-in'
import { SignUpCompleting } from './sign-up-completing'
import { ThirdPartyButton } from './third-party-button'

export const SignUp = () => {
    const settings = useAppSettings()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const userValidation = settings?.validation.user
    const userNameMinLength = userValidation?.name.minLength ?? 0
    const userNameMaxLength = userValidation?.name.maxLength ?? 0
    const userPasswordMinLength = userValidation?.password.minLength ?? 0
    const userPasswordMaxLength = userValidation?.password.maxLength ?? 0

    const initialValues = {
        email: '',
        username: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().trim().required('This field is required').email('Please enter a valid email address'),
        username: Yup.string()
            .trim()
            .required('This field is required')
            .min(userNameMinLength, `This field must be at least ${userNameMinLength} characters long`)
            .max(userNameMaxLength, `This field must be at most ${userNameMaxLength} characters long`)
            .matches(/^[A-Za-z0-9._-]+$/, 'Username can only contain letters, numbers, underscores, hyphens and dots'),
        password: Yup.string()
            .required('This field is required')
            .min(userPasswordMinLength, `This field must be at least ${userPasswordMinLength} characters long`)
            .max(userPasswordMaxLength, `This field must be at most ${userPasswordMaxLength} characters long`)
            .matches(/^(?=.*[a-z])(?=.*[0-9])/, 'Password must contain a lowercase letter and a number'),
    })

    const handleSubmit = async (values: SignUpInputs) => {
        try {
            setIsLoading(true)
            await waitForSuperTokensInitialization()
            const formFields = [
                { id: 'email', value: values.email.trim() },
                { id: 'password', value: values.password },
                { id: 'username', value: values.username.trim() },
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
                            formik.setErrors({ email: 'This email is already taken' })
                        } else {
                            formik.setErrors({ email: emailError.error })
                        }
                    }

                    if (passwordError) {
                        formik.setErrors({ password: passwordError.error })
                    }

                    if (usernameError) {
                        if (usernameError.error === 'USERNAME_ALREADY_EXISTS_ERROR') {
                            formik.setErrors({ username: 'This username is already taken' })
                        }
                        if (usernameError.error === 'USERNAME_INVALID_FORMAT_ERROR') {
                            formik.setErrors({
                                username: 'Username can only contain letters, numbers, underscores, hyphens and dots',
                            })
                        }
                    }
                    break

                default:
                    toast.error('An unexpected error has occurred. Please try again later.')
                    break
            }
        } catch {
            toast.error('An unexpected error has occurred. Please try again later.')
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
        validationSchema: userValidation ? validationSchema : Yup.object(),
        onSubmit: handleSubmit,
    })

    return (
        <form className="flex w-full flex-col gap-y-8 sm:w-104" onSubmit={formik.handleSubmit}>
            <h1 className="h7 text-center">Sign Up</h1>
            <div className="flex flex-col gap-y-4">
                <div className="flex gap-x-2">
                    <ThirdPartyButton provider="google" isDisabled={isLoading || !settings} />
                </div>
                <Devider>Or</Devider>
                <div className="flex flex-col gap-y-2">
                    <FormInput
                        type="text"
                        name="email"
                        value={formik.values.email}
                        placeholder="Email"
                        autoFocus
                        error={formik.errors.email}
                        disabled={isLoading || !settings}
                        onChange={formik.handleChange}
                    />
                    <FormInput
                        type="text"
                        name="username"
                        value={formik.values.username}
                        placeholder="Username"
                        error={formik.errors.username}
                        disabled={isLoading || !settings}
                        onChange={formik.handleChange}
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={formik.values.password}
                        placeholder="Password"
                        error={formik.errors.password}
                        disabled={isLoading || !settings}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <FormButton htmlType="submit" className="w-full" isLoading={isLoading} isDisabled={!settings}>
                    Sign up
                </FormButton>
                <div className="text-small text-black-40 text-center">
                    By completing the registration process, you acknowledge and accept our{' '}
                    <span
                        className="link"
                        onClick={() => {
                            dialog.close()
                            router.push('/legal/terms-and-conditions')
                        }}
                    >
                        Terms and Conditions
                    </span>{' '}
                    and{' '}
                    <span
                        className="link"
                        onClick={() => {
                            dialog.close()
                            router.push('/legal/privacy-policy')
                        }}
                    >
                        Privacy Policy
                    </span>
                    .
                </div>
            </div>
            <div className="text-center">
                Have an account?{' '}
                <span className={`link ${!settings ? 'pointer-events-none opacity-50' : ''}`} onClick={settings ? handleSignInClick : undefined}>
                    Sign in
                </span>
            </div>
        </form>
    )
}
