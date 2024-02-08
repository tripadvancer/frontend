'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import type { IUserInfo, UpdateUserInfoInputs } from '@/utils/types/user'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { FormTextarea } from '@/components/ui/form-textarea'
import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { updateUserInfo } from '@/services/user'
import { useI18n } from '@/utils/i18n/i18n.client'

import { AvatarUploader } from './avatar-uploader'

const userNameMinLength = validationConfig.user.name.minLength
const userNameMaxLength = validationConfig.user.name.maxLength
const userInfoMaxLength = validationConfig.user.info.maxLength

export const SettingsForm = ({ name, info, avatar }: IUserInfo) => {
    const t = useI18n()
    const router = useRouter()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const initialValues = {
        name: name,
        info: info || '',
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(t('validation.required'))
            .min(userNameMinLength, t('validation.text.min_length', { min_length: userNameMinLength }))
            .max(userNameMaxLength, t('validation.text.max_length', { max_length: userNameMaxLength })),
        info: Yup.string().max(userInfoMaxLength, t('validation.text.max_length', { max_length: userInfoMaxLength })),
    })

    const handleSubmit = async (values: UpdateUserInfoInputs) => {
        try {
            setIsLoading(true)
            const response = await updateUserInfo(values)

            switch (response.status) {
                case 'OK':
                    router.refresh()
                    toast.success(t('success.update_user_info'))
                    break

                case 'USERNAME_ALREADY_EXISTS_ERROR':
                    formik.setErrors({ name: t('validation.username.already_exists') })
                    break

                default:
                    toast.error(t('common.error'))
                    break
            }
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setIsLoading(false)
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
        <form className="flex flex-col gap-y-8" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="avatar" className="font-medium">
                        {t('pages.user.settings.forms.fields.avatar.label')}
                    </label>
                    <AvatarUploader currentAvatar={avatar} />
                </div>

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="name" className="font-medium">
                        {t('pages.user.settings.forms.fields.username.label')}
                    </label>
                    <FormInput
                        type="text"
                        name="name"
                        value={formik.values.name}
                        placeholder={t('placeholder.action.username')}
                        error={formik.errors.name}
                        isDisabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="info" className="font-medium">
                        {t('pages.user.settings.forms.fields.info.label')}
                    </label>
                    <FormTextarea
                        name="info"
                        value={formik.values.info}
                        placeholder={t('placeholder.action.about_user')}
                        maxLength={userInfoMaxLength}
                        error={formik.errors.info}
                        isDisabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>

            <FormButton htmlType="submit" className="w-full" isLoading={isLoading}>
                {t('common.action.save_changes')}
            </FormButton>
        </form>
    )
}
