export type PaginatedResponse<T> = {
    totalPages: number
    items: T[]
}

export type FormFieldError = {
    id: string
    error: string
}

export type SVGPath = {
    code: string
    paths: string[]
}
