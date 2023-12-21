export async function addPlaceToFavorite(placeId: number): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/favorites'
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

export async function removePlaceFromFavorite(placeId: number): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + `/favorites/${placeId}`
    const res = await fetch(url, {
        method: 'DELETE',
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}
