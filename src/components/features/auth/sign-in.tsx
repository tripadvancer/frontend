'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { emailPasswordSignIn } from 'supertokens-web-js/recipe/thirdpartyemailpassword'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import { useDialog } from '@/components/providers/dialog-provider'
import { useAppSettings } from '@/components/providers/settings-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Divider } from '@/components/ui/divider'
import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { emailSchema } from '@/utils/helpers/auth'
import { waitForSuperTokensInitialization } from '@/utils/supertokens/supertokens.initialization'
import { SignInInputs } from '@/utils/types/auth'

import { AuthLink } from './auth-link'
import { ForgotPassword } from './forgot-password'
import { SignInReject } from './sign-in-reject'
import { SignUp } from './sign-up'
import { ThirdPartyButton } from './third-party-button'

export const SignIn = () => {
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()
    const settings = useAppSettings()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        email: emailSchema,
        password: Yup.string().required('This field is required'),
    })

    const handleSubmit = async (values: SignInInputs) => {
        try {
            setIsLoading(true)
            await waitForSuperTokensInitialization()
            const formFields = [
                { id: 'email', value: values.email.trim() },
                { id: 'password', value: values.password },
            ]
            const response = await emailPasswordSignIn({ formFields })
            switch (response.status) {
                case 'OK':
                    dialog.close()
                    router.refresh()
                    break

                case 'WRONG_CREDENTIALS_ERROR':
                    formik.setErrors({ password: 'Wrong email or password' })
                    break

                case 'FIELD_ERROR': {
                    const emailError = response.formFields.find(formField => formField.id === 'email')
                    if (emailError) {
                        formik.setErrors({ email: emailError.error })
                    }
                    break
                }

                default:
                    toast.error(UNEXPECTED_ERROR_MESSAGE)
                    break
            }
        } catch (err: unknown) {
            // The backend rejects sessions of accounts pending deletion with 403 and emails a restore link
            if (typeof err === 'object' && err !== null && 'status' in err && err.status === 403) {
                dialog.open(<SignInReject />)
            } else {
                toast.error(UNEXPECTED_ERROR_MESSAGE)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleForgotPasswordClick = () => {
        dialog.open(<ForgotPassword />)
    }

    const handleSignUpClick = () => {
        dialog.open(<SignUp />)
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
            <h1 className="h7 text-center">Sign In</h1>
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
                    Sign in
                </FormButton>
                <div className="text-small text-center">
                    <AuthLink className="text-small" isDisabled={!settings} onClick={handleForgotPasswordClick}>
                        Forgot password?
                    </AuthLink>
                </div>
            </div>
            <div className="text-center">
                Don’t have an account?{' '}
                <AuthLink isDisabled={!settings} onClick={handleSignUpClick}>
                    Sign up
                </AuthLink>
            </div>
        </form>
    )
}
