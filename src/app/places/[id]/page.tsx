type PlacePageProps = {
    params: {
        id: string
    }
}

export default function PlacePage({ params }: PlacePageProps) {
    return <h1>Place {params.id}</h1>
}
