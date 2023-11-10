'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import type { IUserInfo } from '@/utils/types/user'

import { Button } from '@/components/forms/button/button'
import { Input } from '@/components/forms/input/input'
import { Textarea } from '@/components/forms/textarea/textarea'
import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { updateUserInfo } from '@/services/user'
import { useI18n, useScopedI18n } from '@/utils/i18n/i18n.client'

import { UserSettingsAvatar } from './user-settings-avatar'

const userNameMinLength = validationConfig.user.name.minLength
const userNameMaxLength = validationConfig.user.name.maxLength
const userInfoMaxLength = validationConfig.user.info.maxLength

type UserSettingsFormProps = IUserInfo

export const UserSettingsForm = ({ name, info, avatar }: UserSettingsFormProps) => {
    const t = useI18n()
    const tForms = useScopedI18n('pages.user.settings.forms')
    const tValidation = useScopedI18n('forms.validation')
    const router = useRouter()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const formik = useFormik({
        initialValues: {
            name: name || '',
            info: info || '',
            password: '',
            current_password: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required(tValidation('required'))
                .min(userNameMinLength, tValidation('min_length', { min_length: userNameMinLength }))
                .max(userNameMaxLength, tValidation('max_length', { max_length: userNameMaxLength })),
            info: Yup.string().max(userInfoMaxLength, tValidation('max_length', { max_length: userInfoMaxLength })),
        }),
        onSubmit: async values => {
            try {
                setIsLoading(true)
                await updateUserInfo({ name: values.name, info: values.info })
                router.refresh()
                toast.success(t('pages.user.settings.forms.success'))
            } catch (err: any) {
                toast.error(err.message)
            } finally {
                setIsLoading(false)
            }
        },
    })

    return (
        <form className="flex flex-col gap-y-8" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="avatar" className="font-medium">
                        {tForms('upload_avatar.file.label')}
                    </label>
                    <UserSettingsAvatar currentAvatar={avatar} />
                </div>

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="name" className="font-medium">
                        {tForms('username.label')}
                    </label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        value={formik.values.name}
                        placeholder={tForms('username.placeholder')}
                        error={formik.errors.name}
                        isDisabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <label htmlFor="info" className="font-medium">
                        {tForms('info.label')}
                    </label>
                    <Textarea
                        id="info"
                        name="info"
                        value={formik.values.info}
                        placeholder={tForms('info.placeholder')}
                        maxLength={userInfoMaxLength}
                        error={formik.errors.info}
                        isDisabled={isLoading}
                        onChange={formik.handleChange}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-y-2">
                <label htmlFor="current_password" className="font-medium">
                    {tForms('change_password.label')}
                </label>
                <Input
                    id="current_password"
                    type="password"
                    name="current_password"
                    value={formik.values.current_password}
                    placeholder={tForms('current_password.placeholder')}
                    error={formik.errors.current_password}
                    isDisabled={isLoading}
                    onChange={formik.handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    placeholder={tForms('password.placeholder')}
                    error={formik.errors.password}
                    isDisabled={isLoading}
                    onChange={formik.handleChange}
                />
            </div>

            <Button className="w-full" type="submit" isLoading={isLoading}>
                {tForms('submit')}
            </Button>
        </form>
    )
}
