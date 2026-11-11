'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import { useToast } from '@/components/providers/toast-provider'
import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { FormTextarea } from '@/components/ui/form-textarea'
import { validationConfig } from '@/configs/validation.config'
import { SettingsCategories, UserPrivacySettings, UserSocialApps } from '@/utils/enums'
import { userAPI } from '@/utils/redux/services/user/user.api'
import { UpdateUserDataInputs } from '@/utils/redux/services/user/user.types'

import { UserSettingsAvatarUploader } from './user-settings-avatar-uploader'
import { UserSettingsFormPrivacy } from './user-settings-form-privacy'
import { UserSettingsFormSocialLinks } from './user-settings-form-social-links'

const userNameMinLength = validationConfig.user.name.minLength
const userNameMaxLength = validationConfig.user.name.maxLength
const userInfoMaxLength = validationConfig.user.info.maxLength
const userSocialMaxLength = validationConfig.user.social.maxLength

type UserSettingsFormProps = {
    name: string
    info: string
    avatar: string | null
    social: Partial<Record<UserSocialApps, string>>
    settings: {
        [SettingsCategories.PRIVACY]?: Partial<Record<UserPrivacySettings, boolean>>
    }
}

export const UserSettingsForm = ({ name, info, avatar, social, settings }: UserSettingsFormProps) => {
    const router = useRouter()
    const toast = useToast()

    const [updateUserData, { isLoading }] = userAPI.useUpdateUserDataMutation()

    const initialValues = {
        name: name,
        info: info || '',
        settings: {
            [SettingsCategories.PRIVACY]: {
                [UserPrivacySettings.SHOW_MY_MAP]: settings.privacy?.show_my_map || false,
            },
        },
        social: social || {},
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required('This field is required')
            .min(userNameMinLength, `This field must be at least ${userNameMinLength} characters long`)
            .max(userNameMaxLength, `This field must be at most ${userNameMaxLength} characters long`)
            .matches(/^[A-Za-z0-9._-]+$/, 'Username can only contain letters, numbers, underscores, hyphens and dots'),
        info: Yup.string()
            .trim()
            .max(userInfoMaxLength, `This field must be at most ${userInfoMaxLength} characters long`),
        social: Yup.lazy(value =>
            Yup.object().shape(
                Object.keys(value).reduce(
                    (acc: Record<string, any>, key: string) => {
                        acc[key] = Yup.string()
                            .trim()
                            .default('')
                            .required('This field is required')
                            .max(
                                userSocialMaxLength,
                                `This field must be at most ${userSocialMaxLength} characters long`,
                            )
                        return acc
                    },
                    {} as Record<string, Yup.StringSchema<string | undefined>>,
                ),
            ),
        ),
    })

    const handleSubmit = async (inputs: UpdateUserDataInputs) => {
        try {
            const trimmedInputs = {
                ...inputs,
                name: inputs.name?.trim(),
                info: inputs.info?.trim(),
                social: inputs.social
                    ? Object.fromEntries(Object.entries(inputs.social).map(([key, value]) => [key, value.trim()]))
                    : {},
            }
            const response = await updateUserData(trimmedInputs).unwrap()
            switch (response.status) {
                case 'OK':
                    router.replace(`/users/${trimmedInputs.name?.toLowerCase()}/settings`)
                    router.refresh()
                    toast.success('Your profile has been updated.')
                    break
                case 'USERNAME_ALREADY_EXISTS_ERROR':
                    formik.setErrors({ name: 'This username is already taken' })
                    break
                case 'USERNAME_INVALID_FORMAT_ERROR':
                    formik.setErrors({
                        name: 'Username can only contain letters, numbers, underscores, hyphens and dots',
                    })
                    break
                default:
                    toast.error('An unexpected error has occurred. Please try again later.')
                    break
            }
        } catch {
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
        <form className="flex flex-col gap-y-8" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="avatar" className="font-medium">
                        Avatar
                    </label>
                    <UserSettingsAvatarUploader currentAvatar={avatar} />
                </div>

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="name" className="font-medium">
                        Username
                    </label>
                    <FormInput
                        type="text"
                        name="name"
                        value={formik.values.name}
                        placeholder="Enter your username"
                        error={formik.errors.name}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="info" className="font-medium">
                        About me
                    </label>
                    <FormTextarea
                        name="info"
                        value={formik.values.info}
                        placeholder="Enter information about yourself..."
                        maxLength={userInfoMaxLength}
                        style={{ height: '120px' }}
                        error={formik.errors.info}
                        disabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="info" className="font-medium">
                        Social accounts
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
                        Privacy
                    </label>
                    <UserSettingsFormPrivacy
                        initialValue={formik.values.settings}
                        isDisabled={isLoading}
                        onChange={value => formik.setFieldValue('settings', value)}
                    />
                </div>
            </div>

            <FormButton htmlType="submit" className="w-full" isLoading={isLoading}>
                Save changes
            </FormButton>
        </form>
    )
}
