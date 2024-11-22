export const validationConfig = {
    common: {
        maxFileSize: 20e6, // 20 MB
    },
    user: {
        name: {
            minLength: 2,
            maxLength: 25,
        },
        info: {
            maxLength: 1000,
        },
        password: {
            minLength: 8,
            maxLength: 99,
        },
        social: {
            maxLength: 50,
        },
    },
    place: {
        title: {
            minLength: 2,
            maxLength: 80,
        },
        description: {
            minLength: 20,
            maxLength: 2000,
        },
        category: {
            maxCount: 3,
        },
        location: {
            minLength: 3,
            maxLength: 40,
        },
        photos: {
            maxCount: 11,
        },
    },
    review: {
        rate: {
            min: 1,
            max: 5,
        },
        text: {
            minLength: 20,
            maxLength: 1000,
        },
        photos: {
            maxCount: 3,
        },
    },
    complain: {
        maxLength: 200,
    },
    searchQuery: {
        minLength: 2,
        maxLength: 20,
    },
    list: {
        name: {
            maxLength: 40,
        },
        description: {
            maxLength: 80,
        },
    },
}
