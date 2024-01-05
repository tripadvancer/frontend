import { BlockChangePassword } from './block-change-password'
import { BlockRequestPersonalData } from './block-request-personal-data'
import { BlockRequestUserRemoval } from './block-request-user-removal'
import { BlockChangeEmail } from './block-сhange-email'

export const SettingAccount = () => {
    return (
        <div className="flex flex-col gap-y-8">
            <BlockChangeEmail />
            <BlockChangePassword />
            <BlockRequestPersonalData />
            <BlockRequestUserRemoval />
        </div>
    )
}
