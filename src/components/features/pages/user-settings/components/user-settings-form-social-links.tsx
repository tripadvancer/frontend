import { ChangeEvent } from 'react'

import type { IUserSocial } from '@/utils/types/user'

import { FormInput } from '@/components/ui/form-input'
import { FormSelect } from '@/components/ui/form-select'
import {
    DeleteIcon16,
    FacebookIcon16,
    InstagramIcon16,
    TelegramIcon16,
    TiktokIcon16,
    XIcon16,
    YoutubeIcon16,
} from '@/components/ui/icons'
import { UserSocialApps } from '@/utils/enums'

type UserSettingsFormSocialLinksProps = {
    value: IUserSocial
    error?: any
    isDisabled?: boolean
    onChange: (value: IUserSocial) => void
}

export const UserSettingsFormSocialLinks = ({
    value,
    error,
    isDisabled,
    onChange,
}: UserSettingsFormSocialLinksProps) => {
    const socialInputs = {
        [UserSocialApps.FACEBOOK]: {
            placeholder: 'Facebook',
            icon: <FacebookIcon16 />,
            // mask: 'https://facebook.com/***************',
        },
        [UserSocialApps.INSTAGRAM]: {
            placeholder: 'Instagram',
            icon: <InstagramIcon16 />,
            // mask: SocialAppUrls.FACEBOOK + '*********************',
        },
        [UserSocialApps.TELEGRAM]: {
            placeholder: 'Telegram',
            icon: <TelegramIcon16 />,
            // mask: SocialAppUrls.FACEBOOK + '*********************',
        },
        [UserSocialApps.TIKTOK]: {
            placeholder: 'Tiktok',
            icon: <TiktokIcon16 />,
            // mask: SocialAppUrls.FACEBOOK + '*********************',
        },
        [UserSocialApps.X]: {
            placeholder: 'X',
            icon: <XIcon16 />,
            // mask: SocialAppUrls.FACEBOOK + '*********************',
        },
        [UserSocialApps.YOUTUBE]: {
            placeholder: 'Youtube',
            icon: <YoutubeIcon16 />,
            // mask: SocialAppUrls.FACEBOOK + '*********************',
        },
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedValue: IUserSocial = {
            ...value,
            [e.target.name]: e.target.value,
        }
        onChange(updatedValue as IUserSocial)
    }

    const handleDelete = (app: UserSocialApps) => {
        const updatedValue = { ...value }
        delete updatedValue[app]
        onChange(updatedValue)
    }

    return (
        <div className="flex flex-col gap-y-2">
            <FormSelect
                placeholder="Add social link"
                options={Object.values(UserSocialApps)
                    .sort()
                    .map(app => ({
                        value: app,
                        label: socialInputs[app].placeholder,
                        icon: socialInputs[app].icon,
                    }))}
                onChange={field => {
                    onChange({ ...value, [field]: '' })
                }}
            />

            {Object.entries(value).map(([app, link]) => (
                <div key={`social-input-${app}`} className="relative">
                    <FormInput
                        type="text"
                        name={app}
                        value={link}
                        placeholder={socialInputs[app as UserSocialApps].placeholder}
                        disabled={isDisabled}
                        error={error?.[app]}
                        deletable={true}
                        onChange={handleChange}
                    />
                    <div
                        className="absolute right-3 top-3 transform cursor-pointer text-red-100"
                        onClick={() => handleDelete(app as UserSocialApps)}
                    >
                        <DeleteIcon16 />
                    </div>
                </div>
            ))}
        </div>
    )
}
