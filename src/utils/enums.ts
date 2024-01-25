export enum ComplaintReasonsEnum {
    ABUSE = 'ABUSE',
    COPYRIGHT = 'COPYRIGHT',
    DUPLICATE = 'DUPLICATE',
    FALSE = 'FALSE',
    FRAUD = 'FRAUD',
    INAPPROPRIATE = 'INAPPROPRIATE',
    SPAM = 'SPAM',
    OTHER = 'OTHER',
}

export enum ComplaintReasonsI18nKeys {
    ABUSE = 'abuse',
    COPYRIGHT = 'copyright',
    DUPLICATE = 'duplicate',
    FALSE = 'false',
    FRAUD = 'fraud',
    INAPPROPRIATE = 'inappropriate',
    SPAM = 'spam',
    OTHER = 'other',
}

export enum WidgetDefaultLists {
    VISITED = 'VISITED',
    FAVORITES = 'FAVORITES',
}

export enum SearchSuggestionType {
    PLACE = 'PLACE',
    LOCATION = 'LOCATION',
}

export enum ImageUploadStatus {
    UPLOADING = 'UPLOADING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

export enum ImageVariant {
    PUBLIC = 'public',
    PREVIEW = 'preview',
    AVATAR = 'avatar',
}

export enum Keys {
    ENTER = 'Enter',
    ESCAPE = 'Escape',
    UP = 'ArrowUp',
    DOWN = 'ArrowDown',
}

export enum ApiErrorStatusCode {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
}

export enum UserRoles {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export enum UserStatus {
    NOT_ACTIVATED = 'NOT_ACTIVATED',
    ACTIVATED = 'ACTIVATED',
    PENDING_DELETE = 'PENDING_DELETE',
}
