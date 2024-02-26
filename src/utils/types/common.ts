export type PaginatedResponse<T> = {
    totalPages: number
    items: T[]
}

export type PaginatedReview<T> = PaginatedResponse<T> & {
    ownReview: T | null
}

export type FormFieldError = {
    id: string
    error: string
}
