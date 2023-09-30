export const runtime = 'edge'

export default function User({ params }: { params: { id: string } }) {
    return <h1>User, id: {params.id}</h1>
}
