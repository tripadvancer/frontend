const apiUrl = process.env.NEXT_PUBLIC_API_URL

export async function addPlaceToVisited(placeId: number): Promise<void> {
    const url = apiUrl + '/visited'
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeId }),
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}

export async function deletePlaceFromVisited(placeId: number): Promise<void> {
    const url = apiUrl + '/visited/' + placeId
    const res = await fetch(url, {
        method: 'DELETE',
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}
