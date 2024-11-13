import * as yup from 'yup'

interface EnvVariables {
    NODE_ENV: string
    NEXT_PUBLIC_APP_NAME: string
    NEXT_PUBLIC_WEBSITE_DOMAIN: string
    NEXT_PUBLIC_WEBSITE_AUTH_CALLBACK_PATH: string
    NEXT_PUBLIC_API_DOMAIN: string
    NEXT_PUBLIC_API_BASE_PATH: string
    NEXT_PUBLIC_EMAIL: string
    NEXT_PUBLIC_API_URL: string
    NEXT_PUBLIC_INTERNAL_API_URL: string
    NEXT_PUBLIC_MAP_CENTER_LAT: string
    NEXT_PUBLIC_MAP_CENTER_LNG: string
    NEXT_PUBLIC_MAP_ZOOM: string
    NEXT_PUBLIC_MAP_FLY_TO_ZOOM: string
    NEXT_PUBLIC_AROUND_ME_RADIUS: string
    NEXT_PUBLIC_UNIQUE_PLACE_RADIUS: string
    NEXT_PUBLIC_NEARBY_PLACES_RADIUS: string
    NEXT_PUBLIC_GA_MENSUREMENT_ID: string
    SUPERTOKENS_CONNECTION_URI: string
    SUPERTOKENS_API_KEY: string
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: string
    // NEXT_PUBLIC_TEST_USER_COUNTRY: string
    // NEXT_PUBLIC_TEST_USER_LAT: string
    // NEXT_PUBLIC_TEST_USER_LNG: string
}

const defaultValues: EnvVariables = {
    NODE_ENV: 'development',
    NEXT_PUBLIC_APP_NAME: 'Tripadvancer',
    NEXT_PUBLIC_WEBSITE_DOMAIN: 'http://localhost:3000',
    NEXT_PUBLIC_WEBSITE_AUTH_CALLBACK_PATH: 'http://localhost:3000/auth/callback',
    NEXT_PUBLIC_API_DOMAIN: 'http://localhost:3001',
    NEXT_PUBLIC_API_BASE_PATH: '/api/v1',
    NEXT_PUBLIC_EMAIL: 'tripadvancer.team@gmail.com',
    NEXT_PUBLIC_API_URL: 'http://localhost:3001/api/v1',
    NEXT_PUBLIC_INTERNAL_API_URL: 'http://localhost:3000/api',
    NEXT_PUBLIC_MAP_CENTER_LAT: '51.89921',
    NEXT_PUBLIC_MAP_CENTER_LNG: '19.13417',
    NEXT_PUBLIC_MAP_ZOOM: '3',
    NEXT_PUBLIC_MAP_FLY_TO_ZOOM: '14',
    NEXT_PUBLIC_AROUND_ME_RADIUS: '150000',
    NEXT_PUBLIC_UNIQUE_PLACE_RADIUS: '15',
    NEXT_PUBLIC_NEARBY_PLACES_RADIUS: '30000',
    NEXT_PUBLIC_GA_MENSUREMENT_ID: 'SHOULD_BE_SET',
    SUPERTOKENS_CONNECTION_URI: 'SHOULD_BE_SET',
    SUPERTOKENS_API_KEY: 'SHOULD_BE_SET',
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: 'SHOULD_BE_SET',
    // NEXT_PUBLIC_TEST_USER_COUNTRY: 'UA',
    // NEXT_PUBLIC_TEST_USER_LAT: '53.896319',
    // NEXT_PUBLIC_TEST_USER_LNG: '27.563421',
}

const envSchema = yup.object().shape(
    Object.keys(defaultValues).reduce(
        (schema, key) => {
            schema[key as keyof EnvVariables] = yup
                .string()
                .required(`${key} is required. Default: "${defaultValues[key as keyof EnvVariables]}"`)
            return schema
        },
        {} as Record<keyof EnvVariables, yup.StringSchema>,
    ),
)

export default function validateEnv() {
    const bold = '\x1b[1m'
    const red = '\x1b[31m'
    const green = '\x1b[32m'
    const reset = '\x1b[0m'

    try {
        envSchema.validateSync(process.env, { abortEarly: false })
        console.log(` ${bold}${green}✓${reset} Environment variables validation passed`)
    } catch (error) {
        console.error(` ${bold}${red}✗${reset} Environment variables validation failed:`)
        if (error instanceof yup.ValidationError) {
            error.inner.forEach(err => {
                console.error(`   - ${err.message}`)
            })
        }
        console.log('')
        console.log('The application will now exit.')
        console.log('Please update the environment variables and relaunch the application.')
        process.exit(1)
    }
}
