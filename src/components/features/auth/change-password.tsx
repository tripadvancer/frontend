'use client'

import { useFormik } from 'formik'
import Session from 'supertokens-web-js/recipe/session'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import type { ChangeUserPasswordInputs } from '@/utils/types/user'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { userAPI } from '@/redux/services/user-api'
import { useI18n } from '@/utils/i18n/i18n.client'

const userPasswordMinLength = validationConfig.user.password.minLength

export const ChangePassword = () => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [changeUserPassword, { isLoading }] = userAPI.useChangeUserPasswordMutation()

    const initialValues = {
        oldPassword: '',
        newPassword: '',
    }

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required(t('validation.required')),
        newPassword: Yup.string()
            .required(t('validation.required'))
            .min(userPasswordMinLength, t('validation.text.min_length', { min_length: userPasswordMinLength }))
            .matches(/^(?=.*[a-z])(?=.*[0-9])/g, t('validation.password.policy_violated')),
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
                    formik.setErrors({ oldPassword: t('validation.wrong_password') })
                    break

                case 'PASSWORD_POLICY_VIOLATED_ERROR':
                    formik.setErrors({ newPassword: t('validation.password.policy_violated') })
                    break

                default:
                    toast.error(t('common.error'))
                    break
            }
        } catch (err: any) {
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
            <h1 className="text-center text-h7 sm:text-h7-m">{t('auth.change_password.title')}</h1>
            <div className="flex flex-col gap-y-2">
                <p className="text-center">{t('auth.change_password.info')}</p>
                <FormInput
                    type="password"
                    name="oldPassword"
                    value={formik.values.oldPassword}
                    placeholder={t('placeholder.action.password')}
                    autoFocus
                    error={formik.errors.oldPassword}
                    isDisabled={isLoading}
                    onChange={formik.handleChange}
                />
                <FormInput
                    type="password"
                    name="newPassword"
                    value={formik.values.newPassword}
                    placeholder={t('placeholder.action.new_password')}
                    error={formik.errors.newPassword}
                    isDisabled={isLoading}
                    onChange={formik.handleChange}
                />
            </div>
            <FormButton htmlType="submit" className="w-full" isLoading={isLoading}>
                {t('common.action.save_changes')}
            </FormButton>
        </form>
    )
}
