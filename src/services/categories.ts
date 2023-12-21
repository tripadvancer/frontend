import type { ICategory } from '@/utils/types/category'

export async function getCategories(): Promise<ICategory[]> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/categories'
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}
