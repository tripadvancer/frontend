type PlacePageProps = {
    params: {
        slug: string
    }
}

export default function CountryPage({ params }: PlacePageProps) {
    return <h1>Country {params.slug}</h1>
}
