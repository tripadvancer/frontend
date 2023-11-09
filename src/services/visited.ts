export async function addPlaceToVisited(placeId: number): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/visited'
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeId }),
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
}

export async function removePlaceFromVisited(placeId: number): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/visited/' + placeId
    const res = await fetch(url, {
        method: 'DELETE',
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
}
