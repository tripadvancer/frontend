'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { useScopedI18n } from '@/utils/i18n.client'

const userNameMinLength = validationConfig.user.name.minLength
const userNameMaxLength = validationConfig.user.name.maxLength
const passwordMinLength = validationConfig.user.password.minLength
const passwordMaxLength = validationConfig.user.password.maxLength
const userInfoMinLength = validationConfig.user.info.minLength
const userInfoMaxLength = validationConfig.user.info.maxLength

export const UserSettingsForm = () => {
    const tForms = useScopedI18n('pages.user.settings.forms')
    const tValidation = useScopedI18n('forms.validation')
    const toast = useToast()

    const formik = useFormik({
        initialValues: {
            avatar: '',
            name: '',
            info: '',
            password: '',
            current_password: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required(tValidation('required'))
                .min(userNameMinLength, tValidation('min_length', { min_length: userNameMinLength }))
                .max(userNameMaxLength, tValidation('max_length', { max_length: userNameMaxLength })),
            info: Yup.string()
                .min(userInfoMinLength, tValidation('min_length', { min_length: userInfoMinLength }))
                .max(userInfoMaxLength, tValidation('max_length', { max_length: userInfoMaxLength })),
        }),
        onSubmit: async values => {
            // try {
            //     toast.error('Not implemented yet')
            // } catch (err) {
            //     toast.error(getErrorMessage(err))
            // }
        },
    })

    return (
        <form className="flex flex-col gap-y-8" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="avatar" className="font-medium">
                        {tForms('upload_avatar.label')}
                    </label>
                    <Input
                        id="avatar"
                        type="text"
                        name="avatar"
                        value={formik.values.avatar}
                        placeholder={tForms('upload_avatar.placeholder')}
                        error={formik.errors.avatar}
                        onChange={formik.handleChange}
                    />
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
                    onChange={formik.handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    placeholder={tForms('password.placeholder')}
                    error={formik.errors.password}
                    onChange={formik.handleChange}
                />
            </div>

            <Button className="w-full" type="submit">
                {tForms('submit')}
            </Button>
        </form>
    )
}
