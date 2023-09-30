export const runtime = 'edge'

export default function Country({ params }: { params: { slug: string } }) {
    return <h1>Country, slug: {params.slug}</h1>
}
