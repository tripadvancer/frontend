type UserPageProps = {
    params: {
        id: string
    }
}

export const runtime = 'edge'

export default function User({ params }: UserPageProps) {
    return <h1>User {params.id}</h1>
}
