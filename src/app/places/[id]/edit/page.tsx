type EditPlacePageProps = {
    params: {
        id: string
    }
}

export default function EditPlacePage({ params }: EditPlacePageProps) {
    return <h1>Edit Place {params.id}</h1>
}
