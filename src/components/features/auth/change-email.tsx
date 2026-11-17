'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useDialog } from '@/components/providers/dialog-provider'
import { useAppSettings } from '@/components/providers/settings-provider'
import { useToast } from '@/components/providers/toast-provider'
import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { emailSchema } from '@/utils/helpers/auth'
import { userAPI } from '@/utils/redux/services/user/user.api'
import { ChangeUserEmailInputs } from '@/utils/redux/services/user/user.types'

import { ChangeEmailCompleting } from './change-email-completing'

export const ChangeEmail = () => {
    const dialog = useDialog()
    const settings = useAppSettings()
    const toast = useToast()

    const [changeUserEmail, { isLoading }] = userAPI.useChangeUserEmailMutation()

    const initialValues = {
        newEmail: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        newEmail: emailSchema,
        password: Yup.string().required('This field is required'),
    })

    const handleSubmit = async (inputs: ChangeUserEmailInputs) => {
        try {
            const response = await changeUserEmail({ ...inputs, newEmail: inputs.newEmail.trim() }).unwrap()

            switch (response.status) {
                case 'OK':
                    dialog.open(<ChangeEmailCompleting />)
                    break

                case 'WRONG_CREDENTIALS_ERROR':
                    formik.setErrors({ password: 'Wrong password' })
                    break

                case 'EMAIL_ALREADY_EXISTS_ERROR':
                    formik.setErrors({ newEmail: 'This email is already taken' })
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
            <h1 className="h7 text-center">Change email</h1>
            <div className="flex flex-col gap-y-2">
                <p className="text-center">
                    Enter your new email address below and we will send you a verification email:
                </p>
                <FormInput
                    type="text"
                    name="newEmail"
                    value={formik.values.newEmail}
                    placeholder="Enter new email address"
                    autoFocus
                    error={formik.errors.newEmail}
                    disabled={isLoading}
                    onChange={formik.handleChange}
                />
                <FormInput
                    type="password"
                    name="password"
                    value={formik.values.password}
                    placeholder="Enter your password"
                    error={formik.errors.password}
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
