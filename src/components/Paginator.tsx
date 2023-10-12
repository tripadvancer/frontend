import Link from 'next/link'

type PaginatorProps = {
    pages: number
    currentPage: number
}

const PageItem = ({ content, isCurrent }: { content: number | string; isCurrent: boolean }) => (
    <li>
        {content === '...' ? (
            <span className="text-custom-black-40">...</span>
        ) : (
            <Link
                href={{ query: { page: content } }}
                className={isCurrent ? 'text-custom-black-100' : 'text-custom-blue-100'}
            >
                {content}
            </Link>
        )}
    </li>
)

export const Paginator = ({ pages, currentPage }: PaginatorProps) => {
    const maxVisiblePages = 5
    const pageNumbers: (number | string)[] = []

    const renderPageNumbers = () => {
        if (pages <= maxVisiblePages) {
            for (let i = 1; i <= pages; i++) {
                pageNumbers.push(i)
            }
        } else if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
            pageNumbers.push(...Array.from({ length: maxVisiblePages - 1 }, (_, i) => i + 1))
            pageNumbers.push('...')
            pageNumbers.push(pages)
        } else if (currentPage >= pages - Math.floor(maxVisiblePages / 2)) {
            pageNumbers.push(1)
            pageNumbers.push('...')
            pageNumbers.push(
                ...Array.from({ length: maxVisiblePages - 2 }, (_, i) => pages - (maxVisiblePages - 2) + i),
            )
        } else {
            pageNumbers.push(1)
            pageNumbers.push('...')
            pageNumbers.push(
                ...Array.from(
                    { length: maxVisiblePages - 2 },
                    (_, i) => currentPage - Math.floor(maxVisiblePages / 2) + i,
                ),
            )
            pageNumbers.push('...')
            pageNumbers.push(pages)
        }

        return pageNumbers.map((number, index) => (
            <PageItem key={index} content={number} isCurrent={number === currentPage} />
        ))
    }

    return <ol className="flex items-center justify-center gap-x-2 text-sm">{renderPageNumbers()}</ol>
}
