'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import type { ChangeUserEmailInputs } from '@/utils/types/user'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { userAPI } from '@/redux/services/user-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ChangeEmailCompleting } from './change-email-completing'

export const ChangeEmail = () => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [changeUserEmail, { isLoading }] = userAPI.useChangeUserEmailMutation()

    const initialValues = {
        newEmail: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        newEmail: Yup.string()
            .required(t('validation.required'))
            .matches(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
                t('validation.email.invalid'),
            ),
        password: Yup.string().required(t('validation.required')),
    })

    const handleSubmit = async (inputs: ChangeUserEmailInputs) => {
        try {
            const response = await changeUserEmail(inputs).unwrap()

            switch (response.status) {
                case 'OK':
                    dialog.open(<ChangeEmailCompleting />)
                    // toast.success(t('success.change_user_email'))
                    break

                case 'WRONG_CREDENTIALS_ERROR':
                    formik.setErrors({ password: t('validation.wrong_password') })
                    break

                case 'EMAIL_ALREADY_EXISTS_ERROR':
                    formik.setErrors({ newEmail: t('validation.email.already_exists') })
                    break

                default:
                    toast.error(t('common.error'))
                    break
            }
        } catch (err) {
            toast.error(t('common.error'))
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
            <h1 className="h7 text-center">{t('auth.change_email.title')}</h1>
            <div className="flex flex-col gap-y-2">
                <p className="text-center">{t('auth.change_email.info')}</p>
                <FormInput
                    type="text"
                    name="newEmail"
                    value={formik.values.newEmail}
                    placeholder={t('placeholder.action.new_email')}
                    autoFocus
                    error={formik.errors.newEmail}
                    disabled={isLoading}
                    onChange={formik.handleChange}
                />
                <FormInput
                    type="password"
                    name="password"
                    value={formik.values.password}
                    placeholder={t('placeholder.action.password')}
                    error={formik.errors.password}
                    disabled={isLoading}
                    onChange={formik.handleChange}
                />
            </div>
            <FormButton htmlType="submit" className="w-full" isLoading={isLoading}>
                {t('common.action.save_changes')}
            </FormButton>
        </form>
    )
}
