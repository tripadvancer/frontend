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

export type RestoreAccountResponse = {
    status: 'SUCCESS' | 'TOKEN_EXPIRED'
}

export type ConfirmAccountRemovalResponse = {
    status: 'SUCCESS' | 'TOKEN_EXPIRED'
}
