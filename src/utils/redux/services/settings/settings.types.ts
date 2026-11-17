export type ApplicationSettings = {
    name: string
    supportEmail: string
    placesCount: number
    countriesCount: number
    validation: {
        common: {
            maxFileSize: number
        }
        user: {
            name: { minLength: number; maxLength: number }
            info: { maxLength: number }
            password: { minLength: number; maxLength: number }
            social: { maxLength: number }
        }
        place: {
            title: { minLength: number; maxLength: number }
            description: { minLength: number; maxLength: number }
            category: { minCount: number; maxCount: number }
            location: { minLength: number; maxLength: number }
            photos: { maxCount: number }
        }
        review: {
            rate: { min: number; max: number }
            text: { minLength: number; maxLength: number }
            photos: { maxCount: number }
        }
        complaint: { maxLength: number }
        searchQuery: { minLength: number; maxLength: number }
        list: {
            name: { minLength: number; maxLength: number }
            description: { maxLength: number }
        }
    }
    map: {
        center: { latitude: number; longitude: number }
        zoom: number
        flyToZoom: number
    }
    radii: {
        aroundMe: number
        uniquePlace: number
        nearbyPlaces: number
    }
    switchers: {
        add_places: boolean
        update_places: boolean
    }
}
