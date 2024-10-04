import { ChangeEvent } from 'react'

import { IUserSocial } from '@/utils/types/user'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { UserSocialApps } from '@/utils/enums'

type UserSettingsFormSocialLinksProps = {
    value: IUserSocial
    isDisabled?: boolean
    onChange: (value: IUserSocial) => void
}

export const UserSettingsFormSocialLinks = ({ value, isDisabled, onChange }: UserSettingsFormSocialLinksProps) => {
    const socialInputs = {
        [UserSocialApps.FACEBOOK]: {
            name: 'facebook',
            placeholder: 'Facebook',
            // mask: 'https://facebook.com/***************',
        },
        [UserSocialApps.INSTAGRAM]: {
            placeholder: 'Instagram',
            name: 'instagram',
            // mask: SocialAppUrls.FACEBOOK + '*********************',
        },
        [UserSocialApps.TELEGRAM]: {
            placeholder: 'Telegram',
            name: 'telegram',
            // mask: SocialAppUrls.FACEBOOK + '*********************',
        },
        [UserSocialApps.TIKTOK]: {
            placeholder: 'Tiktok',
            name: 'tiktok',
            // mask: SocialAppUrls.FACEBOOK + '*********************',
        },
        [UserSocialApps.X]: {
            placeholder: 'X',
            name: 'x',
            // mask: SocialAppUrls.FACEBOOK + '*********************',
        },
        [UserSocialApps.YOUTUBE]: {
            placeholder: 'Youtube',
            name: 'youtube',
            // mask: SocialAppUrls.FACEBOOK + '*********************',
        },
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedValue: IUserSocial = {
            ...value,
            [e.target.name]: e.target.value,
        }

        onChange(updatedValue)
    }

    return Object.values(UserSocialApps).map(app => (
        <FormInput
            key={`social-input-${app}`}
            type="text"
            name={socialInputs[app].name}
            value={value[app]}
            placeholder={socialInputs[app].placeholder}
            disabled={isDisabled}
            onChange={handleChange}
        />
    ))
}
