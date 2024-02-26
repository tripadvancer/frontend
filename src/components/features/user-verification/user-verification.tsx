'use client'

import Session from 'supertokens-web-js/recipe/session'

export const UserVerification = async () => {
    const doesSessionExist = await Session.doesSessionExist()

    return <div>UserVerification</div>
}
