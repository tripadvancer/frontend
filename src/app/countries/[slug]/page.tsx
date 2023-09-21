type PlacePageProps = {
    params: {
        slug: string
    }
}

export default function Country({ params }: PlacePageProps) {
    return <h1>Country {params.slug}</h1>
}
