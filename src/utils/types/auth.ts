import { ApiResponseStatus } from '@/utils/enums'

export type SignInInputs = {
    email: string
    password: string
}

export type SignUpInputs = {
    email: string
    username: string
    password: string
}

export type ForgotPasswordInputs = {
    email: string
}

export type ResetPasswordInputs = {
    password: string
}

export type TokenInputs = {
    token: string
}

export type StatusResponse = {
    status: ApiResponseStatus
}
