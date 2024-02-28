import { createContext } from 'react'

export interface SupertokensContextInterface {
    activeUserId: number | undefined
    isAuth: boolean
    isMailVerified: boolean
}

export const defaultValues: SupertokensContextInterface = {
    activeUserId: undefined,
    isAuth: false,
    isMailVerified: false,
}

export const SupertokensContext = createContext(defaultValues)
