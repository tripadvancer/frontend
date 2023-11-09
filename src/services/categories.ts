import type { ICategory } from '@/utils/types/category'

export async function getCategories(): Promise<ICategory[]> {
    const url = process.env.API_URL + '/categories'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
