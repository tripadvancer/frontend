type UserPageProps = {
    params: {
        id: string
    }
}

export default function UserPage({ params }: UserPageProps) {
    return <h1>User {params.id}</h1>
}
