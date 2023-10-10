import type { IUser } from '@/types/user'

import { ApiResponseStatus, UserRoles } from '@/utils/enums'

/**
 * Request body for signing in a user.
 */
export type SignInInputs = {
    email: string
    password: string
}

/**
 * Request body for signing up a user.
 */
export type SignUpInputs = {
    email: string
    name: string
    password: string
}

/**
 * Request body for sending a link to reset a user's password.
 * @property {string} email - The user's email.
 */
export type ForgotPasswordInputs = {
    email: string
}

/**
 * Request body for token verification.
 * @property {string} token - The token sent to the user's email.
 */
export type TokenInputs = {
    token: string
}

/**
 * Request body for resetting a user's password.
 * @property {string} token - The token sent to the user's email.
 * @property {string} password - The new password.
 */
export type ResetPasswordInputs = {
    token: string
    password: string
}

/**
 * Common response body for signing in and signing up a user.
 * @property {string} token - The JWT token.
 * @property {AuthUserResponse} user - The user's data.
 */
export type AuthResponse = {
    token: string
    user: AuthUserResponse
}

/**
 * Part of response body for signing in and signing up a user.
 */
export type AuthUserResponse = Pick<IUser, 'id' | 'name'> & {
    role: UserRoles
}

/**
 * Response body with status.
 */
export type StatusResponse = {
    status: ApiResponseStatus
}
