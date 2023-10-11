import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
    return (
        typeof error === 'object' && error != null && 'message' in error && typeof (error as any).message === 'string'
    )
}

export function getErrorMessage(err: unknown): any {
    if (isFetchBaseQueryError(err)) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)
        return JSON.parse(errMsg).message
    }

    if (isErrorWithMessage(err)) {
        // you can access a string 'message' property here
        return err.message
    }

    return 'Unknown error'
}
