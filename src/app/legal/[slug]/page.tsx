type LegalPageProps = {
    params: {
        slug: string
    }
}

export default function LegalPage({ params }: LegalPageProps) {
    return <h1>Legal {params.slug}</h1>
}
