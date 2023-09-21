type UserPageProps = {
    params: {
        id: string
    }
}

export default function User({ params }: UserPageProps) {
    return <h1>User {params.id}</h1>
}
