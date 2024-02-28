import { useContext } from 'react'

import { SupertokensContext, SupertokensContextInterface } from './supertokens.context'

export function useSupertokens(): SupertokensContextInterface {
    const context = useContext(SupertokensContext)

    if (context === undefined) {
        throw new Error('useSupertokens must be used within a SupertokensProvider')
    }

    return context
}
