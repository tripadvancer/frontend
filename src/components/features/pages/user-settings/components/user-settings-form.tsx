'use client'

import { useFormik } from 'formik'
import { useTranslations } from 'next-intl'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import type { IUser, IUserSettings, UpdateUserInfoInputs } from '@/utils/types/user'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { FormTextarea } from '@/components/ui/form-textarea'
import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { userAPI } from '@/redux/services/user-api'
import { SettingsCategories, UserPrivacySettings, UserSocialApps } from '@/utils/enums'

import { UserSettingsAvatarUploader } from './user-settings-avatar-uploader'
import { UserSettingsFormPrivacy } from './user-settings-form-privacy'
import { UserSettingsFormSocialLinks } from './user-settings-form-social-links'

const userNameMinLength = validationConfig.user.name.minLength
const userNameMaxLength = validationConfig.user.name.maxLength
const userInfoMaxLength = validationConfig.user.info.maxLength
const userSocialMaxLength = validationConfig.user.social.maxLength

export const UserSettingsForm = ({ name, info, avatar, social, privacy }: IUser & IUserSettings) => {
    const t = useTranslations()
    const router = useRouter()
    const toast = useToast()

    const [updateUserInfo, { isLoading }] = userAPI.useUpdateUserInfoMutation()

    const initialValues = {
        name: name,
        info: info || '',
        settings: {
            [SettingsCategories.PRIVACY]: {
                [UserPrivacySettings.SHOW_MY_MAP]: privacy?.show_my_map || false,
            },
        },
        social: social || {},
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required(t('validation.required'))
            .min(userNameMinLength, t('validation.text.minLength', { minLength: userNameMinLength }))
            .max(userNameMaxLength, t('validation.text.maxLength', { maxLength: userNameMaxLength })),
        info: Yup.string()
            .trim()
            .max(userInfoMaxLength, t('validation.text.maxLength', { maxLength: userInfoMaxLength })),
        social: Yup.lazy(value =>
            Yup.object().shape(
                Object.keys(value).reduce(
                    (acc: Record<string, any>, key: string) => {
                        acc[key] = Yup.string()
                            .trim()
                            .default('')
                            .required(t('validation.required'))
                            .max(
                                userSocialMaxLength,
                                t('validation.text.maxLength', { maxLength: userSocialMaxLength }),
                            )
                        return acc
                    },
                    {} as Record<string, Yup.StringSchema<string | undefined>>,
                ),
            ),
        ),
    })

    const handleSubmit = async (inputs: UpdateUserInfoInputs) => {
        try {
            const response = await updateUserInfo(inputs).unwrap()
            switch (response.status) {
                case 'OK':
                    router.refresh()
                    toast.success(t('success.updateUserInfo'))
                    break
                case 'USERNAME_ALREADY_EXISTS_ERROR':
                    formik.setErrors({ name: t('validation.wrong.usernameTaken') })
                    break
                default:
                    toast.error(t('common.error'))
                    break
            }
        } catch {
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
        <form className="flex flex-col gap-y-8" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="avatar" className="font-medium">
                        {t('page.user.settingsForm.field.avatar.label')}
                    </label>
                    <UserSettingsAvatarUploader currentAvatar={avatar} />
                </div>

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="name" className="font-medium">
                        {t('page.user.settingsForm.field.username.label')}
                    </label>
                    <FormInput
                        type="text"
                        name="name"
                        value={formik.values.name}
                        placeholder={t('page.user.settingsForm.field.username.placeholder')}
                        error={formik.errors.name}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="info" className="font-medium">
                        {t('page.user.settingsForm.field.aboutMe.label')}
                    </label>
                    <FormTextarea
                        name="info"
                        value={formik.values.info}
                        placeholder={t('page.user.settingsForm.field.aboutMe.placeholder')}
                        maxLength={userInfoMaxLength}
                        style={{ height: '120px' }}
                        error={formik.errors.info}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="info" className="font-medium">
                        {t('page.user.settingsForm.field.contacts.label')}
                    </label>
                    <UserSettingsFormSocialLinks
                        initialValue={formik.values.social}
                        error={formik.errors.social}
                        isDisabled={isLoading}
                        onChange={value => formik.setFieldValue('social', value)}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="info" className="font-medium">
                        {t('page.user.settingsForm.field.settings.privacy.label')}
                    </label>
                    <UserSettingsFormPrivacy
                        initialValue={formik.values.settings}
                        isDisabled={isLoading}
                        onChange={value => formik.setFieldValue('settings', value)}
                    />
                </div>
            </div>

            <FormButton htmlType="submit" className="w-full" isLoading={isLoading}>
                {t('common.action.saveChanges')}
            </FormButton>
        </form>
    )
}
