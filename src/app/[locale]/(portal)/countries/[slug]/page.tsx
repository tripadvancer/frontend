import { getCountries } from '@/services/countries'

export async function generateStaticParams() {
    const countries = await getCountries()

    return countries.map(country => ({
        slug: country.countryCode.toLowerCase(),
    }))
}

export default async function Country({ params }: { params: { slug: string } }) {
    return <h1>{params.slug}</h1>
}
