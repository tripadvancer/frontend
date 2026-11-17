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
import { Divider } from '@/components/ui/divider'
import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { USERNAME_FORMAT_MESSAGE, emailSchema, getPasswordSchema, getUsernameSchema } from '@/utils/helpers/auth'
import { waitForSuperTokensInitialization } from '@/utils/supertokens/supertokens.initialization'
import { SignUpInputs } from '@/utils/types/auth'

import { AuthLink } from './auth-link'
import { SignIn } from './sign-in'
import { SignUpCompleting } from './sign-up-completing'
import { ThirdPartyButton } from './third-party-button'

const SUPERTOKENS_EMAIL_EXISTS_MESSAGE = 'This email already exists. Please sign in instead.'

// Username validation results of the backend sign up form field
const USERNAME_ERROR_MESSAGES: Record<string, string> = {
    USERNAME_ALREADY_EXISTS_ERROR: 'This username is already taken',
    USERNAME_INVALID_FORMAT_ERROR: USERNAME_FORMAT_MESSAGE,
}

export const SignUp = () => {
    const settings = useAppSettings()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const userValidation = settings?.validation.user

    const initialValues = {
        email: '',
        username: '',
        password: '',
    }

    const validationSchema = userValidation
        ? Yup.object().shape({
              email: emailSchema,
              username: getUsernameSchema(userValidation.name),
              password: getPasswordSchema(userValidation.password),
          })
        : Yup.object()

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

                case 'FIELD_ERROR': {
                    const getFieldError = (id: string) => response.formFields.find(field => field.id === id)?.error
                    const emailError = getFieldError('email')
                    const usernameError = getFieldError('username')

                    formik.setErrors({
                        // SuperTokens returns this message when the backend reports EMAIL_ALREADY_EXISTS_ERROR
                        email:
                            emailError === SUPERTOKENS_EMAIL_EXISTS_MESSAGE
                                ? 'This email is already taken'
                                : emailError,
                        password: getFieldError('password'),
                        username: usernameError && USERNAME_ERROR_MESSAGES[usernameError],
                    })
                    break
                }

                default:
                    toast.error(UNEXPECTED_ERROR_MESSAGE)
                    break
            }
        } catch {
            toast.error(UNEXPECTED_ERROR_MESSAGE)
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
            <h1 className="h7 text-center">Sign Up</h1>
            <div className="flex flex-col gap-y-4">
                <div className="flex gap-x-2">
                    <ThirdPartyButton provider="google" isDisabled={isLoading || !settings} />
                </div>
                <Divider>Or</Divider>
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
                <AuthLink isDisabled={!settings} onClick={handleSignInClick}>
                    Sign in
                </AuthLink>
            </div>
        </form>
    )
}
