type LegalPageProps = {
    params: {
        slug: string
    }
}

export const runtime = 'edge'

export default function Legal({ params }: LegalPageProps) {
    return <h1>Legal {params.slug}</h1>
}
