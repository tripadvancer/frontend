import { BlockChangePassword } from './block-change-password'
import { BlockRequestPersonalData } from './block-request-personal-data'
import { BlockRequestUserDeletion } from './block-request-user-deletion'
import { BlockChangeEmail } from './block-сhange-email'

export const SettingAccount = () => {
    return (
        <div className="flex flex-col gap-y-8">
            <BlockChangeEmail />
            <BlockChangePassword />
            <BlockRequestPersonalData />
            <BlockRequestUserDeletion />
        </div>
    )
}
