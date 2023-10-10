export enum CategoriesEnum {
    ABANDONED = 'ABANDONED',
    ADVENTURE_ACTIVITIES = 'ADVENTURE_ACTIVITIES',
    ARCHITECTURE = 'ARCHITECTURE',
    CAMPING_SITES = 'CAMPING_SITES',
    HIKING = 'HIKING',
    HISTORICAL = 'HISTORICAL',
    LANDMARKS = 'LANDMARKS',
    MUSEUMS = 'MUSEUMS',
    NATURAL_ATTRACTIONS = 'NATURAL_ATTRACTIONS',
    OFF_ROAD = 'OFF_ROAD',
    RECREATIONAL_AREAS = 'RECREATIONAL_AREAS',
    SCENIC_VIEWS = 'SCENIC_VIEWS',
}

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

export enum ApiErrorReason {
    ACCOUNT_NOT_ACTIVATED = 'ACCOUNT_NOT_ACTIVATED',
    ACCOUNT_PENDING_DELETE = 'ACCOUNT_PENDING_DELETE',
}

export enum ApiResponseStatus {
    SUCCESS = 'SUCCESS',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
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
