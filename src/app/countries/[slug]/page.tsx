type PlacePageProps = {
    params: {
        slug: string
    }
}

export const runtime = 'edge'

export default function Country({ params }: PlacePageProps) {
    return <h1>Country {params.slug}</h1>
}
