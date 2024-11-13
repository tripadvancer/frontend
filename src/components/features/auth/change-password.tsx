'use client'

import { useFormik } from 'formik'
import { useTranslations } from 'next-intl'
import Session from 'supertokens-web-js/recipe/session'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { userAPI } from '@/redux/services/user.api'
import { ChangeUserPasswordInputs } from '@/redux/services/user.types'

const userPasswordMinLength = validationConfig.user.password.minLength
const userPasswordMaxLength = validationConfig.user.password.maxLength

export const ChangePassword = () => {
    const t = useTranslations()
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
            .min(userPasswordMinLength, t('validation.text.minLength', { minLength: userPasswordMinLength }))
            .max(userPasswordMaxLength, t('validation.text.maxLength', { maxLength: userPasswordMaxLength }))
            .matches(/^(?=.*[a-z])(?=.*[0-9])/g, t('validation.wrong.passwordPolicy')),
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
                    formik.setErrors({ oldPassword: t('validation.wrong.password') })
                    break

                case 'PASSWORD_POLICY_VIOLATED_ERROR':
                    formik.setErrors({ newPassword: t('validation.wrong.passwordPolicy') })
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
            <h1 className="h7 text-center">{t('auth.changePassword.title')}</h1>
            <div className="flex flex-col gap-y-2">
                <p className="text-center">{t('auth.changePassword.text')}</p>
                <FormInput
                    type="password"
                    name="oldPassword"
                    value={formik.values.oldPassword}
                    placeholder={t('placeholder.action.enterPassword')}
                    autoFocus
                    error={formik.errors.oldPassword}
                    disabled={isLoading}
                    onChange={formik.handleChange}
                />
                <FormInput
                    type="password"
                    name="newPassword"
                    value={formik.values.newPassword}
                    placeholder={t('placeholder.action.enterNewPassword')}
                    error={formik.errors.newPassword}
                    disabled={isLoading}
                    onChange={formik.handleChange}
                />
            </div>
            <FormButton htmlType="submit" className="w-full" isLoading={isLoading} isDisabled={!formik.dirty}>
                {t('common.action.saveChanges')}
            </FormButton>
        </form>
    )
}
