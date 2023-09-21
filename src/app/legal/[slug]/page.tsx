type LegalPageProps = {
    params: {
        slug: string
    }
}

export default function Legal({ params }: LegalPageProps) {
    return <h1>Legal {params.slug}</h1>
}
