'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import { sendPasswordResetEmail } from 'supertokens-web-js/recipe/emailpassword'
import * as Yup from 'yup'

import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { ForgotPasswordInputs } from '@/utils/types/auth'

import { ForgotPasswordCompleting } from './forgot-password-completing'
import { SignIn } from './sign-in'
import { SignUp } from './sign-up'

export const ForgotPassword = () => {
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const initialValues = {
        email: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .trim()
            .required('This field is required')
            .matches(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
                'Please enter a valid email address',
            ),
    })

    const handleSubmit = async (values: ForgotPasswordInputs) => {
        try {
            setIsLoading(true)
            const formFields = [{ id: 'email', value: values.email.trim() }]
            const response = await sendPasswordResetEmail({ formFields })

            switch (response.status) {
                case 'OK':
                    dialog.open(<ForgotPasswordCompleting />)
                    break

                case 'FIELD_ERROR':
                    const emailError = response.formFields.find(formField => formField.id === 'email')
                    if (emailError) {
                        formik.setErrors({ email: emailError.error })
                    }
                    break

                default:
                    toast.error('An unexpected error has occurred. Please try again later.')
                    break
            }
        } catch (err) {
            toast.error('An unexpected error has occurred. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignInClcik = () => {
        dialog.open(<SignIn />)
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
            <h1 className="h7 text-center">Forgot your password?</h1>
            <div className="flex flex-col gap-y-2">
                <p className="text-center">
                    To reset your password, please enter your email address. We will send an email to the provided
                    address with instructions on how to reset your password:
                </p>
                <FormInput
                    type="text"
                    name="email"
                    value={formik.values.email}
                    placeholder="Enter email address"
                    autoFocus
                    error={formik.errors.email}
                    disabled={isLoading}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="flex flex-col gap-y-4">
                <FormButton htmlType="submit" className="w-full" isLoading={isLoading}>
                    Restore password
                </FormButton>
                <div className="text-center">
                    {
                        <>
                            <span className="link" onClick={handleSignInClcik}>
                                Sign in
                            </span>{' '}
                            or{' '}
                            <span className="link" onClick={handleSignUpClick}>
                                Sign up
                            </span>
                        </>
                    }
                </div>
            </div>
        </form>
    )
}
