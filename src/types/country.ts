export type ICountry = {
    countryCode: string
    placesCount: number
}

export type ICountryDict = {
    code: string
    slug: string
    name: {
        [locale: string]: string
    }
}
