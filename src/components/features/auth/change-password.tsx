'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useDialog } from '@/components/providers/dialog-provider'
import { useAppSettings } from '@/components/providers/settings-provider'
import { useToast } from '@/components/providers/toast-provider'
import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { getPasswordSchema } from '@/utils/helpers/auth'
import { useSignOut } from '@/utils/hooks/use-sign-out'
import { userAPI } from '@/utils/redux/services/user/user.api'
import { ChangeUserPasswordInputs } from '@/utils/redux/services/user/user.types'

export const ChangePassword = () => {
    const settings = useAppSettings()
    const dialog = useDialog()
    const toast = useToast()
    const signOut = useSignOut()

    const [changeUserPassword, { isLoading }] = userAPI.useChangeUserPasswordMutation()
    const passwordValidation = settings?.validation.user.password

    const initialValues = {
        oldPassword: '',
        newPassword: '',
    }

    const validationSchema = passwordValidation
        ? Yup.object().shape({
              oldPassword: Yup.string().required('This field is required'),
              newPassword: getPasswordSchema(passwordValidation),
          })
        : Yup.object()

    const handleSubmit = async (inputs: ChangeUserPasswordInputs) => {
        try {
            const response = await changeUserPassword(inputs).unwrap()

            switch (response.status) {
                // The backend revokes all sessions after a password change
                case 'OK':
                    dialog.close()
                    await signOut()
                    break

                case 'WRONG_CREDENTIALS_ERROR':
                    formik.setErrors({ oldPassword: 'Wrong password' })
                    break

                case 'PASSWORD_POLICY_VIOLATED_ERROR':
                    formik.setErrors({ newPassword: 'Password must contain at least 8 characters, including a number' })
                    break

                default:
                    toast.error(UNEXPECTED_ERROR_MESSAGE)
                    break
            }
        } catch {
            toast.error(UNEXPECTED_ERROR_MESSAGE)
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
            <FormButton
                htmlType="submit"
                className="w-full"
                isLoading={isLoading}
                isDisabled={!settings || !formik.dirty}
            >
                Save changes
            </FormButton>
        </form>
    )
}
