'use client'

import { useFormik } from 'formik'
import Session from 'supertokens-web-js/recipe/session'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { validationConfig } from '@/configs/validation.config'
import { userAPI } from '@/utils/redux/services/user/user.api'
import { ChangeUserPasswordInputs } from '@/utils/redux/services/user/user.types'

const userPasswordMinLength = validationConfig.user.password.minLength
const userPasswordMaxLength = validationConfig.user.password.maxLength

export const ChangePassword = () => {
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [changeUserPassword, { isLoading }] = userAPI.useChangeUserPasswordMutation()

    const initialValues = {
        oldPassword: '',
        newPassword: '',
    }

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('This field is required'),
        newPassword: Yup.string()
            .required('This field is required')
            .min(userPasswordMinLength, `This field must be at least ${userPasswordMinLength} characters long`)
            .max(userPasswordMaxLength, `This field must be at most ${userPasswordMaxLength} characters long`)
            .matches(/^(?=.*[a-z])(?=.*[0-9])/g, 'Password must contain at least 8 characters, including a number'),
    })

    const handleSubmit = async (inputs: ChangeUserPasswordInputs) => {
        try {
            const response = await changeUserPassword(inputs).unwrap()
            switch (response.status) {
                case 'OK':
                    await Session.signOut()
                    dialog.close()
                    router.push('/')
                    router.refresh()
                    break

                case 'WRONG_CREDENTIALS_ERROR':
                    formik.setErrors({ oldPassword: 'Wrong password' })
                    break

                case 'PASSWORD_POLICY_VIOLATED_ERROR':
                    formik.setErrors({ newPassword: 'Password must contain at least 8 characters, including a number' })
                    break

                default:
                    toast.error('An unexpected error has occurred. Please try again later.')
                    break
            }
        } catch (err: any) {
            toast.error('An unexpected error has occurred. Please try again later.')
        }
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
            <h1 className="h7 text-center">Change password</h1>
            <div className="flex flex-col gap-y-2">
                <p className="text-center">
                    Create a new password that is at least 8 characters long and contains a mix of letters and numbers:
                </p>
                <FormInput
                    type="password"
                    name="oldPassword"
                    value={formik.values.oldPassword}
                    placeholder="Enter your password"
                    autoFocus
                    error={formik.errors.oldPassword}
                    disabled={isLoading}
                    onChange={formik.handleChange}
                />
                <FormInput
                    type="password"
                    name="newPassword"
                    value={formik.values.newPassword}
                    placeholder="Enter new password"
                    error={formik.errors.newPassword}
                    disabled={isLoading}
                    onChange={formik.handleChange}
                />
            </div>
            <FormButton htmlType="submit" className="w-full" isLoading={isLoading} isDisabled={!formik.dirty}>
                Save changes
            </FormButton>
        </form>
    )
}
