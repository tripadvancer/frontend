export type PaginatedResponse<T> = {
    total: number
    items: T[]
}

export type FormFieldError = {
    id: string
    error: string
}
